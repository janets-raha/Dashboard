import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";
import * as Icon from "react-bootstrap-icons";

export class ShowCacaoConcerts extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     concerts: [],
  //     color: 'yellow',
  //   }
  // }
  state = {
    concerts: [],
    color: "yellow",
    bgColor: "bg-warning",
  };

  componentDidMount = () => {
    if (this.props.params) {
      axios.get(`http://localhost:3002/concerts`).then((res) => {
        this.setState({
          concerts: res.data,
          color: this.props.params.color,
          bgColor:
            this.props.params.color === "yellow" ? "bg-warning" : "bg-info",
        });
      });
    }
  };

  // setColor = (e) => {
  //   this.setState({ color: e.target.value });
  // };

  handleChange = (e) => {
    let bgColor = e.target.value === "yellow" ? "bg-warning" : "bg-info";
    this.setState({ color: e.target.value, bgColor: bgColor });
    this.props.updateWidget(this.props.id, { color: e.target.value });
  };

  reload() {
    this.componentDidMount();
  }

  render() {
    // let color;

    // // choose background color
    // if (this.state.color === "yellow") {
    //   color = "bg-warning";
    // }
    // if (this.state.color === "blue") {
    //   color = "bg-info";
    // }

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
                Show Cacao - Concerts
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
            </div>
          </Accordion>

          <div className="overflow-auto px-3">
            {this.state.concerts.map((concert) => (
              <div key={concert.id}>
                <p className="text-center">
                  {concert.bands.join(" - ")}
                  <br />
                  {concert.place}
                  <br />
                  {new Date(concert.date).toLocaleString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    weekday: "long",
                  })}{" "}
                  - {concert.price + "€"}
                </p>
                <hr />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }
}

ShowCacaoConcerts.propTypes = {
  color: PropTypes.object,
  id: PropTypes.string,
  deleteWidget: PropTypes.func.isRequired,
};

export default ShowCacaoConcerts;
