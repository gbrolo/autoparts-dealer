import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'

import Dashboard from './Dashboard';

import { Redirect } from 'react-router'

import '../res/css/auth.css';

function isLoggedIn() {
    var login_data = JSON.parse(localStorage.login_data || null) || {};
    if (login_data === true) {
      return true
    }
    return false
}

const Main = () => (

  <div>

    <Switch>
      <Route exact path='/dashboard' render={() => (
          isLoggedIn() ? (
              <Dashboard/>
          ) : (
             <Redirect to="/"/>
          )
        )}/>
    </Switch>

  </div>
)


class MainActivity extends Component {

   constructor(props){
    super(props);
    var login_data = JSON.parse(localStorage.login_data || null) || {};
    this.state = {
      userData: login_data.data || "default"
    }
  }
  render() {
    return (
      <div className="main-wrapper">
        <div className="main-screen">
          <Main />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps, null)(MainActivity);
