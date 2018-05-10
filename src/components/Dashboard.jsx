import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import axios from 'axios';
import "react-table/react-table.css";
import { Checkbox, Button, Panel, PanelGroup, FormGroup, FormControl, InputGroup, Grid, Row, Col } from 'react-bootstrap';

import '../res/css/dashboard.css';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      toSearch: '',
      data: []
    }
  }

  render() {
    const { data } = this.state;
    const columns = [{
        Header: 'Parte',
        accessor: 'name',
        className: "center"
    }, {
        Header: 'Color',
        accessor: 'color',
        className: "center"
    }, {
        Header: 'Peso',
        accessor: 'weight',
        className: "center"
    }, {
        Header: 'Precio',
        accessor: 'price',
        className: "center"
    }];
    return (
      <div>
          <div className="search-container">
            <FormGroup>
               <InputGroup className="form-element-sfr">
                 <FormControl onChange={(event) => this.setState({toSearch: event.target.value})} type="text" placeholder="Buscar" required/>
                 <i className="fa fa-search search-icon" aria-hidden="true" onClick={(event) => this.search(event)}></i>
               </InputGroup>
            </FormGroup>
          </div>
          <div>
            <ReactTable
                data = {this.state.data}
                columns = {columns}
            />
          </div>
      </div>
    )
  }

  search(event) {
      axios.get('http://localhost:8080/api/parts', {
          params: {
              search: this.state.toSearch
          }
      })
      .then(res => {
          this.setState({
              data: res.data.rows[0]
          })
      })
  }
}


function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps, null)(Dashboard);
