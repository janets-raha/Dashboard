import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
//import { Link } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
//import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";

class OmdbActors extends Component {
  state = {
    value: "",
    movie: {},
  };

  componentDidMount() {
    // console.log("timer", this.props.timer)

    if (this.props.params) {
      axios
        .get(
          `http://www.omdbapi.com/?apikey=89e82fd&t=${this.props.params.value}`
        )
        .then((res) => {
          if (res.data.Response !== "False") {
            // console.log(res.data)
            this.setState({ movie: res.data });
          } else {
            this.setState({
              movie: {
                Title: "Not Found",
                Actors: "pas de résultats pour cette recherche",
              },
            });
          }
        });
    }
  }

  reload() {
    this.componentDidMount();
  }

  handleSubmit = (e) => {
    axios
      .get(`http://www.omdbapi.com/?apikey=89e82fd&t=${this.state.value}`)
      .then((res) => {
        if (res.data.Response !== "False") {
          // console.log(res.data)
          this.setState({ movie: res.data });
        } else {
          this.setState({
            movie: {
              Title: "Not Found",
              Actors: "pas de résultats pour cette recherche",
            },
          });
        }
        this.props.updateWidget(this.props.id, { value: this.state.value });
      });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <Card style={{ width: "25rem" }} className="shadow my-4 ">
        <Accordion>
          <div className="bg-warning d-flex justify-content-between p-2">
            <h5 className="text-center ml-3 p-2 font-weight-bold bg-warning ">
              Acteur de Film
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
                <input
                  type="text"
                  name="search"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit} className="btn-dark">
                  OK
                </button>
              </div>
            </Accordion.Collapse>
            <div className="mt-3">
              <h5>{this.state.movie.Title}</h5>
              <p>{this.state.movie.Actors}</p>
            </div>
          </div>
        </Accordion>
      </Card>
    );
  }
}

OmdbActors.propTypes = {
  params: PropTypes.object,
  id: PropTypes.string,
  deleteWidget: PropTypes.func.isRequired,
  updateWidget: PropTypes.func.isRequired,
};

export default OmdbActors;
