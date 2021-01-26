import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "react-uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserApi from "./apis/User.js";
//import News from './components/News';
//import OmdbSummary from './components/OmdbSummary';
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import WidgetApi from "./apis/Widget.js";
//import Timer from './components/Timer';

class App extends Component {
  state = {
    isLoggedIn: false,
    user: {
      name: "",
    },
    userId: "",
    userWidgets: [],
    widgets: [],
  };

  widgetCount = 0;

  async componentDidMount() {
    const token = await localStorage.getItem("token");
    if (token) {
      const auth = await UserApi.auth();
      const rawWidgets = await WidgetApi.getWidgets();
      auth.data.widgets.map(
        async (wid) => await this.addComponent(wid, rawWidgets.data)
      );
      this.setState({
        user: auth.data,
        isLoggedIn: true,
        widgets: rawWidgets.data,
      });
      //console.log("raw widget", this.state.widgets)
      //console.log("userWidget", auth.data.widgets)
    }
  }

  addComponent = async (widget, rawWidgets) => {
    const { componentName } = widget;
    const widgetCmp = rawWidgets.find(
      (wid) => wid.componentName === widget.componentName
    );
    // console.log(widgetCmp.timer)

    import(`./components/${componentName}.js`)
      .then((Component) => {
        widget.order = this.widgetCount++;
        widget.cmp = (
          <Component.default
            key={widget.id}
            params={widget.params}
            id={widget.id}
            timer={widgetCmp.timer}
            deleteWidget={this.deleteWidget}
            updateWidget={this.updateWidget}
          />
        );
        this.setState({ userWidgets: this.state.userWidgets.concat(widget) });
      })
      .catch((error) => {
        console.error(`"${componentName}" not yet supported`);
      });
  };

  logUser = (token) => {
    localStorage.setItem("token", token);
    UserApi.auth()
      .then((response) => {
        this.setState({ user: response.data, isLoggedIn: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ user: { name: "", widgets: [] }, isLoggedIn: false });
  };

  //recupère les widget de la db
  /*   getWidgets = () => {
      const token = localStorage.getItem("token");
      if (token) {
        UserApi.auth()
          .then((response) => {
            this.setState({ userWidgets: response.data.widgets, isLoggedIn: true, userId: response.data.id })
          })
          .catch(error => {
            console.log(error)
          });
      }
    } */

  updateWidget = (widgetId, params) => {
    const userWidget = this.state.userWidgets.find(
      (element) => element.id === widgetId
    );
    userWidget.params = params;

    const widgets = [];
    this.state.userWidgets.forEach((wid) => {
      let temp = {
        name: wid.name,
        id: wid.id,
        componentName: wid.componentName,
        params: wid.params,
      };
      widgets.push(temp);
    });
    UserApi.saveUser(this.state.user.id, { widgets: widgets });
  };

  addWidget = (widgetName) => {
    const widgetCmp = this.state.widgets.find(
      (wid) => wid.componentName === widgetName
    );
    const userWidgets = this.state.userWidgets;
    const widget = {
      id: uuid(),
      name: widgetName,
      componentName: widgetName,
      value: "",
    };
    import(`./components/${widget.componentName}.js`)
      .then((Component) => {
        widget.order = this.widgetCount++;
        widget.cmp = (
          <Component.default
            key={widget.id}
            params={widget.params}
            id={widget.id}
            timer={widgetCmp.timer}
            deleteWidget={this.deleteWidget}
            updateWidget={this.updateWidget}
          />
        );
        this.setState({ userWidgets: this.state.userWidgets.concat(widget) });
      })
      .catch((error) => {
        console.error(`"${widget.componentName}" not yet supported`);
      });
    UserApi.saveUser(this.state.user.id, {
      widgets: userWidgets.concat(widget),
    });
  };

  deleteWidget = (widgetId) => {
    const userWidgets = (state) => {
      const list = state.userWidgets.filter((item) => item.id !== widgetId);
      return list;
    };
    const newUserWidget = userWidgets(this.state);
    this.setState({ userWidgets: newUserWidget });
    const widgets = [];
    newUserWidget.forEach((wid) => {
      let temp = {
        name: wid.name,
        id: wid.id,
        componentName: wid.componentName,
        params: wid.params,
      };
      widgets.push(temp);
    });
    UserApi.saveUser(this.state.user.id, { widgets: widgets });
  };

  onReorder = (e, newidx, previdx) => {
    const sortedUserWidgets = this.state.userWidgets;
    let tmp = sortedUserWidgets[newidx];
    sortedUserWidgets[newidx] = sortedUserWidgets[previdx];
    sortedUserWidgets[previdx] = tmp;
    this.setState({ userWigets: sortedUserWidgets });
    UserApi.saveUser(this.state.user.id, { widgets: sortedUserWidgets });
  };

  render() {
    return (
      <Router>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user}
          widgets={this.state.widgets}
          logout={this.logout}
          addWidget={this.addWidget}
        />
        <Route exact path="/">
          <Dashboard
            widgets={this.state.userWidgets}
            updateWidget={this.updateWidget}
            deleteWidget={this.deleteWidget}
            onReorder={this.onReorder}
          />
        </Route>
        <Route path="/login" history={this.props.history}>
          <Login logUser={this.logUser} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Router>
    );
  }
}

export default App;
