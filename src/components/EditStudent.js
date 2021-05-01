import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class EditStudent extends Component{
  constructor(props){
      super(props);

      this.state = {
        firstName: '',
        lastName: '',
        gpa: '',
        email: '',
        url: '',
        collegeID: ''
      }

      this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
      this.handleLastNameInput = this.handleLastNameInput.bind(this);
      this.handleGPAInput = this.handleGPAInput.bind(this);
      this.handleURLInput = this.handleURLInput.bind(this);
      this.handleEmailInput = this.handleEmailInput.bind(this);
      this.handleCollegeIDInput = this.handleCollegeIDInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstNameInput = (data) => {
    this.setState({firstName: data.target.value});
  }

  handleLastNameInput = (data) => {
    this.setState({lastName: data.target.value});
  }

  handleGPAInput = (data) => {
    this.setState({gpa: data.target.value});
  }

  handleURLInput = (data) => {
    this.setState({url: data.target.value});
  }

  handleEmailInput = (data) => {
    this.setState({email: data.target.value})
  }

  handleCollegeIDInput = (data) => {
    this.setState({collegeID: data.target.value})
  }

  handleSubmit = (event) => {
    axios.put('http://localhost:5000/api/students' + this.props.id, {
      "firstname": this.state.firstName,
      "lastname": this.state.lastName,
      "image": this.state.url,
      "email": this.state.email,
      "gpa": this.state.gpa,
      "collegeID": this.state.collegeID
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    })

    window.location.replace('/studentlist');
  }

  render(){
    return(
      <div className="App">
        <div className="App-header">
          <div>
            <Link id="buttons" to="/">
              <button>
                <p>Home</p>
              </button>
            </Link>
            <Link id="buttons" to="/campuslist">
              <button>
                <p>Campuses</p>
              </button>
            </Link>
            <Link id="buttons" to='/studentlist'>
              <button>
                <p>Students</p>
              </button>
            </Link>
          </div>

          <br></br>

          <form id="addCampus" onSubmit={this.handleSubmit}>
            <div>
            <h3>Edit Student</h3>
              <div>
                <label>Student First Name: </label>
                <input type="text" name="firstname" onChange={this.handleFirstNameInput} required/>
              </div>
              <div>
                <label>Student Last Name: </label>
                <input type="text" name="lasttname" onChange={this.handleLastNameInput} required/>
              </div>
              <div>
                <label>Student Email: </label>
                <input type="text" name="email" onChange={this.handleEmailInput} required/>
              </div>
              <div>
                <label>Student GPA: </label>
                <input type="text" name="gpa" onChange={this.handleGPAInput} required/>
              </div>
              <div>
                <label>Image URL: </label>
                <input type="text" name="url" onChange={this.handleURLInput} required/>
              </div>
              <div>
                <label>Student ID: </label>
                <input type="text" name="collegeID" onChange={this.handleCollegeIDInput}/>
              </div>

              <br></br>
              
              <div id="buttons">
                <button type="submit">
                  <p>Edit Campus</p>
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.getCurrentEditStudent
  };
}

export default connect(mapStateToProps)(EditStudent);
