import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import * as Icon from "react-bootstrap-icons";

export class ClockTime extends Component {
  state = {
    date: new Date(),
    color: "yellow",
    showSeconds: true,
    bgColor: "bg-warning",
  };
  timer = null;

  componentDidMount() {
    if (this.props.params) {
      this.setState({
        date: new Date(),
        color: this.props.params.color,
        showSeconds: this.props.params.showSeconds,
        bgColor:
          this.props.params.color === "yellow" ? "bg-warning" : "bg-info",
      });
    } else {
      this.setState({
        date: new Date(),
      });
    }
    // console.log(this.props.timer)
    this.timer = window.setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, this.props.timer);
  }

  handleChange = (e) => {
    this.setState({ showSeconds: e.target.checked });
    this.props.updateWidget(this.props.id, {
      color: this.state.color,
      showSeconds: e.target.checked,
    });
  };

  setColor = (e) => {
    let bgColor = e.target.value === "yellow" ? "bg-warning" : "bg-info";
    this.setState({ color: e.target.value, bgColor: bgColor });
    this.props.updateWidget(this.props.id, {
      showSeconds: this.state.showSeconds,
      color: e.target.value,
    });
  };

  reload() {
    this.componentDidMount();
  }

  render() {
    let display;
    // let color;

    // // choose background color
    // if (this.state.color === "yellow") {
    //   color = "bg-warning";
    // }
    // if (this.state.color === "blue") {
    //   color = "bg-info";
    // }

    // choose display seconds
    if (this.state.showSeconds) {
      display = (
        <h4>
          {this.state.date.toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </h4>
      );
      // display = "hour: '2-digit', minute: '2-digit', second: '2-digit'"
    } else {
      display = (
        <h4>
          {this.state.date.toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h4>
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
                Time
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
                    onChange={this.setColor}
                    as="select"
                    custom
                  >
                    <option>Couleur</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                  </Form.Control>
                  <Form.Check
                    type="checkbox"
                    label="Seconds"
                    onChange={this.handleChange}
                    checked={this.state.showSeconds}
                  />
                </div>
              </Accordion.Collapse>
              <div className="text-center overflow-auto px-3">{display}</div>
            </div>
          </Accordion>

          {/* <div className={color + " d-flex justify-content-between p-2"}>
            <h5 className={"text-center p-2 font-weight-bold " + color}>
              Time
            </h5>
            <Dropdown className="ml-auto mr-1">
              <Dropdown.Toggle id="dropdown-basic">
                <Icon.Tools className="" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Form.Check
                    type="checkbox"
                    label="Seconds"
                    onChange={this.handleChange}
                    checked={this.state.showSeconds}
                  />
                </Dropdown.Item>
                <Dropdown.Item>
                  <Form.Check
                    type="radio"
                    name="color"
                    value="yellow"
                    label="Yellow"
                    onClick={this.setColor}
                    checked={this.state.color === "yellow"}
                  />
                </Dropdown.Item>
                <Dropdown.Item>
                  <Form.Check
                    type="radio"
                    name="color"
                    value="blue"
                    label="Blue"
                    onClick={this.setColor}
                    checked={this.state.color === "blue"}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <a href="">
              <Icon.XSquareFill
                onClick={this.props.deleteWidget.bind(this, this.props.id)}
                color="red"
                size={30}
                className=""
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>

          <div className="text-center overflow-auto px-3">
            {
              // <h4>{this.state.date.toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</h4>
            }
            {display}
          </div> */}
        </Card>
      </div>
    );
  }
}

ClockTime.propTypes = {
  color: PropTypes.object,
  showSeconds: PropTypes.object,
  id: PropTypes.string,
  deleteWidget: PropTypes.func.isRequired,
};

export default ClockTime;
