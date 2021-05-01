import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class NewStudent extends Component{
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

  handleFirstNameInput = (e) => {
    this.setState({firstName: e.target.value});
  }

  handleLastNameInput = (e) => {
    this.setState({lastName: e.target.value});
  }

  handleGPAInput = (e) => {
    this.setState({gpa: e.target.value});
  }

  handleURLInput = (e) => {
    this.setState({url: e.target.value});
  }

  handleEmailInput = (e) => {
    this.setState({email: e.target.value})
  }

  handleCollegeIDInput = (e) => {
    this.setState({collegeID: e.target.value})
  }

  handleSubmit = (event) => {
    axios.post('http://localhost:5000/api/students',{
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'url': this.state.url,
      'gpa': this.state.gpa,
      'email': this.state.email,
      'collegeID': this.state.collegeID
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });

    window.location.replace('studentlist');
  }

  render(){
    // Use something like this in the call to post the student to add to appropriate school
    // let id = 0;
    // if(this.props.addToCollege === undefined){
    //   id = '2'
    // } else {
    //   id = this.props.addToCollege;
    // }

    // console.log(id);

    return(
      <div className="App">
        <div className="App-header">
          <div>
            <Link id="buttons" to="/">
              <button>
                <p>Home</p>
              </button>
            </Link>
            <Link id="buttons" to='/campuslist'>
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
          <h2>Add New Student</h2>
          <form id="addStudent" onSubmit={this.handleSubmit}>
            <div>
              <div>
                <label>Student First Name: </label>
                <input type="text" name="firstname" onChange={this.handleFirstNameInput} required/>
              </div>
              <div>
                <label>Student Last Name: </label>
                <input type="text" name="lastname" onChange={this.handleLastNameInput} required/>
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
              <label>Student URL: </label>
                <input type="text" name="url" onChange={this.handleURLInput} required/>
              </div>
              <div>
                <label>Student ID: </label>
                <input type="text" name="collegeID" onChange={this.handleCollegeIDInput}/>
              </div>

              <br></br>

              <div id="buttons">
                <button type="submit">
                  <p>Add Student</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewStudent;
