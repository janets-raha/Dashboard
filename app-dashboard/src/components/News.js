import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
//import { Link } from 'react-router-dom'
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
//import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import * as Icon from "react-bootstrap-icons";

export class News extends Component {
  state = {
    value: "",
    news: [],
  };

  componentDidMount() {
    // console.log("did mount News")
    if (this.props.params) {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?sources=${this.props.params.source}&apiKey=aaa2efb8ddb043ecadd6950489da316f`
        )
        .then((res) => {
          this.setState({ news: res.data.articles });
        });
    }
  }

  reload() {
    this.componentDidMount();
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?sources=${this.state.value}&apiKey=aaa2efb8ddb043ecadd6950489da316f`
      )
      .then((res) => {
        this.setState({ news: res.data.articles });
        this.props.updateWidget(this.props.id, { source: this.state.value });
      });
  };

  render() {
    return (
      <Card
        style={{
          width: "25rem",
          maxHeight: "300px",
        }}
        className="shadow my-4"
      >
        <Accordion>
          <div className="bg-warning d-flex justify-content-between p-2">
            <h5 className="text-center ml-3 p-2 font-weight-bold bg-warning ">
              A la une
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

          <Accordion.Collapse eventKey="0">
            <div className="d-flex flex-row p-3 align-items-start">
              <Form.Control
                value={this.state.value}
                onChange={this.handleChange}
                as="select"
                custom
              >
                <option>Choisir une source</option>
                <option value="buzzfeed">Buzz Feed</option>
                <option value="cnn">CNN</option>
                <option value="google-news-fr">Google news</option>
                <option value="le-monde">Le Monde</option>
                <option value="lequipe">L'équipe</option>
                <option value="les-echos">Les Echos</option>
                <option value="national-geographic">National Geographic</option>
                <option value="reuters">Reuters</option>
              </Form.Control>
              <button onClick={this.handleSubmit} className="btn-dark">
                OK
              </button>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <div className="overflow-auto px-3 my-3">
          {this.state.news.map((article) => (
            <div key={article.publishedAt}>
              <p className="text-center">
                {article.title} -{" "}
                <a href={article.url} className=" btn-sm btn-info">
                  Lire
                </a>
              </p>
            </div>
          ))}
        </div>
      </Card>
    );
  }
}

News.propTypes = {
  params: PropTypes.object,
  id: PropTypes.string,
  deleteWidget: PropTypes.func.isRequired,
  updateWidget: PropTypes.func.isRequired,
};

export default News;

/* User = {
    ...
    widgets :[
        {
            id : UUId,
            type: "ComponentName", // nom de la balise
            params : {
                value: "critereData", // props à ajouter sur la balise
                style: "critereStyle" // props à ajouter sur la balise
            }
        },
        {
            id: UUId,
            type: "ComponentName", //nom de la balise
            params: {
                value: "critereData", // props à ajouter sur la balise
                style: "critereStyle" // props à ajouter sur la balise
            }
        },
    ]
} */
