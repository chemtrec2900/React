import React, { Component } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

class AddAppointments extends Component{

  constructor(){
    super();
    this.state = {
      petName: '',
      ownerName: '',
      aptNotes: '',
      aptDate: '',
      apptTime: ''
    }
    this.handleOnchange = this.handleOnchange.bind(this);
    this.addHandle = this.addHandle.bind(this);
  }

  addHandle(e){
    e.preventDefault();
    let tempApt ={
      petName: this.state.petName,
      ownerName: this.state.ownerName,
      aptNotes: this.state.aptNotes,
      aptDate: this.state.aptDate + ' ' + this.state.apptTime
    };
    this.props.addAppointment(tempApt);
    this.setState({
      petName: '',
      ownerName: '',
      aptNotes: '',
      aptDate: '',
      apptTime: ''
    });
    this.props.toggleForm();
    console.log(tempApt);
  }

  handleOnchange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]:value});
  }

  render(){
    return(
      <div className={
          'card textcenter mt-3 ' + 
          (this.props.formDisplay ? '' : 'add-appointment')
        }
      >
          <div className="apt-addheading card-header bg-primary text-white"
            onClick={this.props.toggleForm}
          >
            {!this.props.formDisplay ? < FaPlus /> : < FaMinus /> } Add Appointment
          </div>
          <div className="card-body">
            <form id="aptForm" noValidate onSubmit={this.addHandle}>
              <div className="form-group form-row">
                <label
                  className="col-md-2 col-form-label text-md-right"
                  htmlFor="petName"
                  readOnly >
                  Pet Name
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    name="petName"
                    placeholder="Pet's Name"
                    value={this.state.petName}
                    onChange={this.handleOnchange}
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label
                  className="col-md-2 col-form-label text-md-right"
                  htmlFor="ownerName">
                  Pet Owner
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    name="ownerName"
                    placeholder="Owner's Name"
                    value={this.state.ownerName}
                    onChange={this.handleOnchange}
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label
                  className="col-md-2 col-form-label text-md-right"
                  htmlFor="aptDate">
                  Date
                </label>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    name="aptDate"
                    id="aptDate"
                    value={this.state.aptDate}
                    onChange={this.handleOnchange}
                  />
                </div>
                <label
                  className="col-md-2 col-form-label text-md-right"
                  htmlFor="aptTime">
                  Time
                </label>
                <div className="col-md-4">
                  <input
                    type="time"
                    className="form-control"
                    name="aptTime"
                    id="aptTime"
                    value={this.state.apptTime}
                    onChange={this.handleOnchange}
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                  Apt. Notes
                </label>
                <div className="col-md-10">
                  <textarea
                    className="form-control"
                    rows="4"
                    cols="50"
                    name="aptNotes"
                    id="aptNotes"
                    placeholder="Appointment Notes"/>
                </div>
              </div>
              <div className="form-group form-row mb-0">
                <div className="offset-md-2 col-md-10">
                  <button
                    type="submit"
                    className="btn btn-primary d-block ml-auto">
                    Add Appointment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
    )
  }
}

export default AddAppointments;