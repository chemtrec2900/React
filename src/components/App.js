import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments'
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';

import {without, findIndex} from 'lodash';

class App extends Component {

  constructor(){
    super();
    this.state = {      
      myAppointments: [],
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 'asc',
      queryText: '',
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  toggleForm (){
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }
  updateInfo(name, value, id){
    let tempAppts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {
      apptId: id
    });
    tempAppts[aptIndex][name] = value;
    this.setState({myAppointments: tempAppts});
    console.log(this.state);
  }
  searchApts(query){
    this.setState({queryText: query});
  }

  changeOrder(order,dir){
    this.setState({
      orderBy: order,
      orderDir: dir
    });
    console.log(order + ' ' + dir);
    console.log(this.state);
  }

  addAppointment(apt){
    let tempApts = this.state.myAppointments;
    apt.apptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    })
  }

  deleteAppointment(appt){
    let tempAppts = this.state.myAppointments;
    tempAppts = without(tempAppts, appt);
    this.setState({myAppointments: tempAppts})
  }

  componentDidMount(){
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const appts = result.map(item => {
          item.apptId = this.state.lastIndex;
          this.setState({lastIndex: this.state.lastIndex + 1});
          return item;
        });
        this.setState({
          myAppointments: appts          
        });
      });
      
  }

  render() {    

    let order;
    let filteredApts = this.state.myAppointments;
    if(this.state.orderDir === 'asc'){
      order = 1;
    }else{
      order = -1;
    }

    filteredApts = filteredApts.sort((a, b) => {
      if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()){
        return -1 * order;
      }else{
        return 1 * order;
      }
    }).filter(eachItem => {
      return eachItem['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
    });

    return (
      <main className="page bg-white" id="petratings">
        < div className = "container" >
          < div className = "row" >
            < div className = "col-md-12 bg-white" >
              < div className = "container" >                          
                < AddAppointments 
                formDisplay={this.state.formDisplay} 
                toggleForm={this.toggleForm} 
                addAppointment={this.addAppointment}
                />
                <SearchAppointments 
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  searchApts={this.searchApts}
                />
                <ListAppointments 
                  appointments={filteredApts} 
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;