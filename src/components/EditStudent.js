import React, {Component} from 'react';
import {returnSingleStudent} from '../actions'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

let axios= require('axios');

class EditStudent extends Component{
  constructor(props){
      super(props);

      this.state = {
        student : {},
        firstName: '',
        lastName: '',
        gpa: '',
        email: '',
        url: '',
        collegeID: ''
      }
      axios.get('http://localhost:5000/api/students/'+this.props.id)
      .then(response => {
        let student=response.data;
        this.setState({student});
      })
      .catch(err=>{
        console.log(err)});
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

  handleSubmit = async(event) => {
    console.log(this.state.student.firstname);
    let tempstudent=this.state.student;
    tempstudent.firstname= this.state.firstName;
    tempstudent.lastname= this.state.lastName;
    tempstudent.imageUrl= this.state.url;
    tempstudent.email = this.state.email;
    tempstudent.gpa= this.state.gpa;

    
   this.setState({student:tempstudent});
    console.log(this.state.student);

    await axios.put('http://localhost:5000/api/students/'+this.state.student.id, this.state.student)
    .then(response=>{
      console.log(response);
    }).catch(err=>{
      console.log(err);
    })
    this.props.returnSingleStudent(this.state.student.id);
    this.props.history.push('/singlestudent')
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
                <button type="submit" onClick={this.handleSubmit}>
                  <p>Edit Student</p>
                </button>
              </div>

            </div>
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

export default withRouter(connect(mapStateToProps, {returnSingleStudent})(EditStudent));
