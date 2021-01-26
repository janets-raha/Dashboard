import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import * as Icon from "react-bootstrap-icons";

export class ClockDate extends Component {
  state = {
    date: new Date(),
    color: "yellow",
    bgColor: "bg-warning",
  };
  timer = null;

  componentDidMount() {
    if (this.props.params) {
      this.setState({
        date: new Date(),
        color: this.props.params.color,
        bgColor: this.props.params.color === "yellow" ? "bg-warning" : "bg-info",
      });
    } else {
      this.setState({
        date: new Date()
      });
    }

    this.timer = window.setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, this.props.timer);
  }

  handleChange = (e) => {
    let bgColor = e.target.value === "yellow" ? "bg-warning" : "bg-info";
    this.setState({ color: e.target.value, bgColor: bgColor });
    this.props.updateWidget(this.props.id, { color: e.target.value });
  };

  onChange = (e) => { };

  reload() {
    this.componentDidMount();
  }

  render() {
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
                Date
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
                    onChange={this.handleChange}
                    as="select"
                    custom
                  >
                    <option>Couleur</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                  </Form.Control>{" "}
                </div>
              </Accordion.Collapse>
              <div className="text-center overflow-auto px-3">
                {
                  <h4>
                    {this.state.date.toLocaleString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>
                }
              </div>
            </div>
          </Accordion>
        </Card>
      </div>
    );
  }
}

ClockDate.propTypes = {
  color: PropTypes.object,
  id: PropTypes.string,
  deleteWidget: PropTypes.func.isRequired,
};

export default ClockDate;
