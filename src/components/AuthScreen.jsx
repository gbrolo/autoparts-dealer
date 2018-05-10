import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Modal, Checkbox, Button, Panel, PanelGroup, FormGroup, FormControl, InputGroup, Grid, Row, Col } from 'react-bootstrap';
import '../res/css/auth.css';
import '../res/icons/font-awesome-4.7.0/css/font-awesome.min.css';

const user_pic = require('../res/assets/img/user-def-xs.png');

var owasp = require('owasp-password-strength-test');

var login_data = JSON.parse(localStorage.login_data || null) || {};
var user_projects_list = JSON.parse(localStorage.user_projects_list || null) || {};
var current_project_info = JSON.parse(localStorage.current_project_info || null) || {};

class AuthScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
          passwordLogin: '',
          emailLogin: '',
          nameUser: '',
          email: '',
          lastname: '',
          address: '',
          telephone: '',
          redirect:false,
          password: '',
          confirm_password: '',
          acceptedPolitics: false,
          error: '',
          register_error: '',
          show: false,
          userdata : {

          },
          dataToken : {

          },
          userprojectslist: {

          }
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({[fieldName]: fieldValue});
        this.validateForm();

    }

    onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    handleCheckBox(event){
        this.setState({acceptedPolitics: event.target.checked});
        this.validateForm();
    }

    validateEmail(value) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    validatePasswordConfirm(){
        const password = this.state.password;
        const password_confirmed = this.state.confirm_password;
        return password === password_confirmed;
    }

    validateForm(){
        const email = this.validateEmail(this.state.email);
        const password = owasp.test(this.state.password).strong;  // owasp security level check
        const confirm = this.validatePasswordConfirm();
        return email && password && confirm;
    }

  saveLoginData() {
    var loggedIn = true;
    localStorage.login_data = JSON.stringify(loggedIn);
    this.setState({redirect: true});
  }

  login(event) {
    // Prevent refresh
    this.onSubmit(event);
    var qs = require('qs');

    // make request here
    this.saveLoginData();
  }


  handleClose() {
   this.setState({ show: false });
  }

  handleShow() {
   this.setState({ show: true });
  }

  register(event) {
    this.onSubmit(event);

    const registerFormValid = this.validateForm();
    if (registerFormValid){
        document.getElementById('register-error-msg').style.display = 'none';
        var qs = require('qs');

        var newUser = {
            firstname: this.state.nameUser,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address
        }

            this.handleShow();
        axios.post('http://localhost:8080/api/user', newUser).then(res => {
        })
    } else {
        this.setState({ register_error: 5 });
        document.getElementById('register-error-msg').style.display = 'block';
    }
  }


nothing() {

    }
errores1(){
    if (this.state.error===1){
        return "Su correo o contraseña no es valido intente de nuevo";
    }
}
errores2(){
    var mostrarErrores = "";

    if (this.state.register_error===5){
        // String de errores
        var erroresInicio = "";

        // Verificar si el error esta en la seguridad de contrasena
        var resultPasswordTest = owasp.test(this.state.password);
        if (!resultPasswordTest.strong){
            resultPasswordTest.errors.forEach(function (error) {
                // Traducir mensajes
                if (error.includes("least 10 characters long")){
                    erroresInicio = erroresInicio + "La contraseña debe contener al menos 10 carácteres.\n"

                } else if (error.includes("one uppercase letter")) {
                    erroresInicio = erroresInicio + "La contraseña debe tener al menos una letra mayúscula.\n"

                } else if (error.includes("one number.")) {
                    erroresInicio = erroresInicio + "La contraseña debe tener al menos un número.\n"

                } else if (error.includes("one special character.")) {
                    erroresInicio = erroresInicio + "La contraseña debe tener al menos un carácter especial.\n"

                } else if (error.includes("must contain at least one lowercase letter.")) {
                    erroresInicio = erroresInicio + "La contraseña debe tener al menos un letra minúscula.\n"

                } else {
                    erroresInicio = erroresInicio + error + "\n "

                }
            })
        }


        var resultPasswordConfirmation = this.validatePasswordConfirm();
        if (!resultPasswordConfirmation){
            erroresInicio = erroresInicio + "Las contraseñas no coinciden. ";
        }

        if (erroresInicio === ""){
            this.setState({ register_error: '' });
            document.getElementById('register-error-msg').style.display = 'none';
        }

        mostrarErrores =  erroresInicio;
    }

    return mostrarErrores;
}
  render() {
    const isLoggedIn = this.state.redirect;
    return(
      <div>
        <Grid className="auth-title-logo">
          <Row>
            <Col xs={3} sm={3} md={12} lg={12} >
              Autoparts Dealer
            </Col>
          </Row>
        </Grid>
        <div className="auth-container">
          <Grid className="auth-grid">
            <Row>
              <Col xs={3} sm={3} md={12} lg={12} className="auth-col">
                <div className="auth-title">
                  Iniciar Sesión
                  <hr />
                </div>
                <form onSubmit={(e)=>this.login(e)}>
                  <FormGroup>
                      <InputGroup className="form-element">
                        <FormControl
                            type="email"
                            name="emailLogin"
                            placeholder="Ingrese su correo"
                            value={this.state.emailLogin}
                            onChange={this.handleChange}
                            required
                        />
                      </InputGroup>
                   </FormGroup>
                   <FormGroup>
                       <InputGroup className="form-element">
                         <FormControl
                             name="passwordLogin"
                             type="password"
                             placeholder="Ingrese su contraseña"
                             value={this.state.passwordLogin}
                             onChange={this.handleChange}
                             required
                         />
                       </InputGroup>
                   </FormGroup>
                   <div className="error-msg" id="login-error-msg">
                      { this.errores1() }
                   </div>
                   <div>
                      <Button type="submit" className="button-s" block>Ingresar</Button>
                         {isLoggedIn ? (
                          <Redirect  to="/dashboard" />
                        ) : (
                          this.nothing()
                        )}
                   </div>
                </form>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className="auth-container">
          <Grid className="auth-grid">
            <Row>
              <Col xs={3} sm={3} md={12} lg={12} className="auth-col">
                <div className="auth-title">
                  Registro
                  <hr />
                </div>
                <form onSubmit={(e)=>this.register(e)}>
                <FormGroup>
                    <InputGroup className="form-element">
                      <FormControl
                          type="text"
                          name="nameUser"
                          placeholder="Ingrese su nombre"
                          value={this.state.nameUser}
                          onChange={this.handleChange}
                          required
                      />
                    </InputGroup>
                 </FormGroup>
                 <FormGroup>
                     <InputGroup className="form-element">
                       <FormControl
                           type="text"
                           name="lastname"
                           placeholder="Ingrese sus apellidos"
                           value={this.state.lastname}
                           onChange={this.handleChange}
                           required
                       />
                     </InputGroup>
                  </FormGroup>
                  <FormGroup>
                      <InputGroup className="form-element">
                        <FormControl
                            type="text"
                            name="address"
                            placeholder="Ingrese su dirección"
                            value={this.state.address}
                            onChange={this.handleChange}
                            required
                        />
                      </InputGroup>
                   </FormGroup>
                  <FormGroup>
                      <InputGroup className="form-element">
                        <FormControl
                            type="email"
                            name="email"
                            placeholder="Ingrese su correo"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                      </InputGroup>
                   </FormGroup>
                   <FormGroup>
                       <InputGroup className="form-element">
                         <FormControl
                             name="password"
                             type="password"
                             placeholder="Ingrese su contraseña"
                             value={this.state.password}
                             onChange={this.handleChange}
                             required
                         />
                       </InputGroup>
                   </FormGroup>
                   <FormGroup>
                       <InputGroup className="form-element">
                         <FormControl
                             name="confirm_password"
                             type="password"
                             placeholder="Ingrese su contraseña"
                             value={this.state.confirm_password}
                             onChange={this.handleChange}
                             required
                         />
                       </InputGroup>
                   </FormGroup>
                   <div className="politicas">
                     <FormGroup>
                       <Checkbox inline onChange={this.handleCheckBox} required>
                         Al crear tu cuenta, estás aceptando los términos del servicio y las políticas de privacidad de Autoparts Dealer.
                       </Checkbox>
                     </FormGroup>
                   </div>
                   <div className="error-msg" id="register-error-msg">
                      { this.errores2() }
                   </div>
                   <div>
                      <Button type = "submit" className="button-s" block>Crear cuenta</Button>
                   </div>
                </form>
              </Col>
            </Row>
          </Grid>
        </div>

          <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps, null)(AuthScreen);
