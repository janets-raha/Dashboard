import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserApi from '../apis/User.js'
//import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom"


class Login extends Component {
  state = {
    username: "",
    password: "",
    redirection: false,
  }


  login = (e) => {
    if (
      this.state.username &&
      this.state.password
    ) {
      UserApi.login(this.state)
        .then((response) => {
          this.props.logUser(response.data.access_token)
          //this.props.history.push('/');
          this.setState({ redirection: true });
        })
        .catch(error => {
          this.errors = 2;
          this.error_message = error.response;
        });
    } else {
      this.errors = 1;
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name
    this.setState({
      [key]: value
    });
  }


  render() {
    const { redirection } = this.state;
    if (redirection) {
      //Affichage de la redirection
      return <Redirect to='/' />;
    }
    return (
      <div className="login my-4">
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <Card.Header><Card.Title>Connexion</Card.Title></Card.Header>
              <Card.Body>
                <Form.Group as={Row}>
                  <Form.Label column md={4} className="text-md-right">Adresse e-mail</Form.Label>
                  <Col md={6}><Form.Control controlid="emailCtlId" required name="username" value={this.state.username} onChange={this.handleChange}></Form.Control></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={4} className="text-md-right">Mot de passe</Form.Label>
                  <Col md={6}><Form.Control type="password" controlid="passwordtlId" name="password" value={this.state.password} onChange={this.handleChange}></Form.Control></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col md={12}>
                    <Button variant="primary" onClick={this.login}>Se connecter</Button>
                  </Col>
                </Form.Group>
                {this.errors === 1 && <div
                  class="alert alert-danger mt-4"
                  role="alert"
                >L'email ou le mot de passe est incorrect</div>
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div >
    );
  }
}

Login.propTypes = {
  logUser: PropTypes.func.isRequired
}
export default Login;
