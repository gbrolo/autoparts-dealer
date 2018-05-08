import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Button, Panel, PanelGroup, FormGroup, FormControl, InputGroup, Grid, Row, Col } from 'react-bootstrap';

import '../res/css/dashboard.css';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      toSearch: ''
    }
  }

  render() {
    return (
      <div className="search-container">
        <FormGroup>
           <InputGroup className="form-element-sfr">
             <i className="fa fa-search search-icon" aria-hidden="true"></i>
             <FormControl onChange={(event) => this.setState({toSearch: event.target.value})} type="text" placeholder="Buscar" required/>
           </InputGroup>
        </FormGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps, null)(Dashboard);
