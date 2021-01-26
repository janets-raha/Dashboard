import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";
import * as Icon from "react-bootstrap-icons";

export class ShowCacaoTickets extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     userId: '',
  //     userToken: '',
  //     isLogged: false,
  //     tickets: [],
  //     color: 'yellow',
  //   }
  // }

  state = {
    userId: "",
    userToken: "",
    isLogged: false,
    tickets: [],
    color: "yellow",
    bgColor: "bg-warning",
  };

  componentDidMount = () => {
    if (this.props.params) {
      const tokenBearer = "Bearer " + this.props.params.userToken;
      axios
        .get(`http://localhost:3002/tickets/user/${this.props.params.userId}`, {
          headers: { Authorization: tokenBearer },
        })
        .then((res) => {
          this.setState({
            isLogged: true,
            tickets: res.data,
            color: this.props.params.color,
            bgColor:
              this.props.params.color === "yellow" ? "bg-warning" : "bg-info",
          });
        });
    }
  };

  handleChangeColor = (e) => {
    let bgColor = e.target.value === "yellow" ? "bg-warning" : "bg-info";
    this.setState({ color: e.target.value, bgColor: bgColor });
  };

  handleChangeId = (e) => {
    this.setState({
      userId: e.target.value,
    });
  };

  handleChangeToken = (e) => {
    this.setState({
      userToken: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.userId && this.state.userToken) {
      const tokenBearer = "Bearer " + this.state.userToken;
      axios
        .get(`http://localhost:3002/tickets/user/${this.state.userId}`, {
          headers: { Authorization: tokenBearer },
        })
        .then((res) => {
          this.setState({
            isLogged: true,
            tickets: res.data,
          });
          this.props.updateWidget(this.props.id, {
            color: this.state.color,
            userId: this.state.userId,
            userToken: this.state.userToken,
          });
          // this.reload;
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            isLogged: false,
            userId: "",
            userToken: "",
          });
          // this.reload;
        });
    }
  };

  // setColor = (e) => {
  //   this.setState({ color: e.target.value });
  // };

  reload() {
    this.componentDidMount();
  }

  render() {
    // let color;
    let display;

    // // choose background color
    // if (this.state.color === "yellow") {
    //   color = "bg-warning";
    // }
    // if (this.state.color === "blue") {
    //   color = "bg-info";
    // }

    //!logged = login form - logged = user's ticket list
    if (!this.state.isLogged) {
      display = (
        <div className="d-flex flex-row p-3 align-items-start">
          <Form>
            <Form.Control
              type="text"
              name="userId"
              placeholder="UserID"
              value={this.state.userId}
              onChange={this.handleChangeId}
            />
            <Form.Control
              type="text"
              name="userToken"
              placeholder="Token"
              value={this.state.userToken}
              onChange={this.handleChangeToken}
            />
            <br />
            <button onClick={this.handleSubmit} className="btn-dark">
              OK
            </button>
          </Form>
        </div>
      );
    } else {
      display = (
        <div className="overflow-auto px-3">
          {this.state.tickets.map((ticket) => (
            <div key={ticket._id}>
              <p className="text-center">
                {ticket.concert_id.bands.join(" - ")}
                <br />
                {new Date(ticket.concert_id.date).toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  weekday: "long",
                })}
                <br />
                {ticket.concert_id.place}
              </p>
              <hr />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        <Card
          style={{
            width: "25rem",
            maxHeight: "300px",
          }}
          className="shadow my-4"
        >
          <Accordion>
            <div
              className={
                this.state.bgColor + " d-flex justify-content-between p-2"
              }
            >
              <h5
                className={
                  "text-center ml-3 p-2 font-weight-bold " + this.state.bgColor
                }
              >
                Show Cacao - Tickets
              </h5>
              <div className="text-center ml-3 p-2">
                <Accordion.Toggle variant="dark" eventKey="0" className="mr-4">
                  <Icon.Tools className="" />
                </Accordion.Toggle>
                <Icon.XSquareFill
                  onClick={this.props.deleteWidget.bind(this, this.props.id)}
                  color="red"
                  size={30}
                  className=""
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div className="p-3">
              <Accordion.Collapse eventKey="0">
                <div>
                  <Form.Control
                    style={{ width: "150px" }}
                    value={this.state.value}
                    onChange={this.handleChangeColor}
                    as="select"
                    custom
                  >
                    <option>Couleur</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                  </Form.Control>{" "}
                </div>
              </Accordion.Collapse>
            </div>
          </Accordion>

          <div className="overflow-auto px-3">{display}</div>
        </Card>
      </div>
    );
  }
}

ShowCacaoTickets.propTypes = {
  userId: PropTypes.string,
  userToken: PropTypes.string,
  // isLogged: PropTypes.bool, // needed ?
  color: PropTypes.object,
  id: PropTypes.string,
  deleteWidget: PropTypes.func.isRequired,
};

export default ShowCacaoTickets;
