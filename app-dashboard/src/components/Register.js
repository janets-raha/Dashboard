import React, { Component } from "react";
/*   */
import "bootstrap/dist/css/bootstrap.min.css";
import UserApi from "../apis/User.js";
//import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    redirection: false,
  };

  register = (e) => {
    // console.log(this.state)
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.password2
    ) {
      if (this.state.password === this.state.password2) {
        UserApi.register(this.state)
          .then((response) => {
            // console.log(response.data)
            //useHistory.push('/login')
            this.setState({ redirection: true });
          })
          .catch((error) => {
            this.errors = 2;
            this.error_message = error.response;
          });
      }
    } else {
      this.errors = 1;
    }
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { redirection } = this.state;
    if (redirection) {
      //Affichage de la redirection
      return <Redirect to="/login" />;
    }
    return (
      <div className="login my-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="text-center">
              <h4>Enregistrer un compte</h4>
              <div className="py-4">
                <div className="form-group row">
                  <label
                    xfor="name"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Nom
                  </label>
                  <div className="col-md-6">
                    <input
                      value={this.state.name}
                      onChange={this.handleChange}
                      name="name"
                      type="text"
                      className="form-control"
                      required
                      placeholder="Entrez un nom..."
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    xfor="email"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Adresse E-mail
                  </label>
                  <div className="col-md-6">
                    <input
                      value={this.state.email}
                      onChange={this.handleChange}
                      name="email"
                      type="email"
                      className="form-control"
                      required
                      placeholder="utilisateur@exemple.fr"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    xfor="pass1"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Mot de passe
                  </label>
                  <div className="col-md-6">
                    <input
                      value={this.state.password}
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    xfor="pass2"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Confirmer le mot de passe
                  </label>
                  <div className="col-md-6">
                    <input
                      value={this.state.password2}
                      onChange={this.handleChange}
                      name="password2"
                      type="password"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary my-4"
                  onClick={this.register}
                >
                  Créer un compte
                </button>
              </div>
              {this.state.error === 1 && (
                <div className="alert alert-danger mt-2" role="alert">
                  Tous les champs doivent être remplis
                </div>
              )}
            </div>
            {this.state.error === 2 && (
              <div className="alert alert-danger mt-2" role="alert">
                Cet email existe déjà, veuillez en entrer un nouveau
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
