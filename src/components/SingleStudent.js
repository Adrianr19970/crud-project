import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { returnCurrentEditStudent } from '../actions';
import url from '../apis/URL';
let axios= require('axios');

class SingleStudent extends Component{
  constructor(props){
    super(props);

    this.state = {
      selectedNewCampus: '',
      student: {},
      studentsCampus: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.onSubmitCampusChange = this.onSubmitCampusChange.bind(this);

    console.log(this.props.student);
    url.get('/api/students/' + this.props.student)
      .then(response => {
        let student = response.data;
        this.setState({student});
      })
      .catch(err => {
        console.log(err);
      })

    url.get('/api/campuses/' + this.state.student.campusId)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  }

  //changes state and edits student on database
  handleChange = async(event) => {
    console.log(this.state.student.campus);
    let tempstudent= this.state.student;
    await axios.get('http://localhost:5000/api/campuses/' + this.state.selectedNewCampus)
    .then(response => {
      let campus=response.data;
 
      tempstudent.campus=response.data;
      tempstudent.campusId= response.data.id;
    })
    .catch(err=>{
      console.log(err);
    })

    this.setState({student: tempstudent});
    console.log(this.state.student.id);
    axios.put('http://localhost:5000/api/students/'+this.state.student.id, this.state.student)
    .then(response=>{
      console.log(response);
    }).catch(err=>{
      console.log(err);
    })
  }

  onEdit = (event) => {
    console.log('Edit');
  }

  onDelete = (event) => {
  axios.delete('http://localhost:5000/api/students/' + this.props.student)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    window.location.replace('studentlist');
  }

  handleCampusChange = (data) => {
    this.setState({selectedNewCampus:data.target.value});
  }

  onSubmitCampusChange = (event, campus) => {
    if(this.state.selectedNewCampus !== ''){
      let student = this.state.student
      url.put('http://localhost:5000/api/students/' + student.id, {
        "firstname": student.firstName,
        "lastname": student.lastName,
        "image": student.url,
        "email": student.email,
        "gpa": student.gpa,
        "collegeID": this.state.selectedNewCampus
      }).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
    } else {
      window.alert('Need to select a school from the dropdown to change campus!');
    }
  }

  render() {
    console.log(this.props.student)
    let list = [];
    let allCampuses = this.props.allCampuses;
    let student = this.state.student;
    let studentName = student.firstname + " " + student.lastname;
    console.log(student);

    for(let i = 0; i < allCampuses.length; i++){
      let campus = allCampuses[i];
      list.push(
                  <option value={campus.id}>{campus.name}</option>
                );
    }

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
                <p>View Campuses</p>
              </button>
            </Link>
            <Link id="buttons" to='/studentlist'>
              <button>
                  <p>View Students</p>
              </button>
            </Link>
          </div>

          <br></br>
          
          <div id="singleStudent">
            <img src={student.image_path} alt={studentName} />
            <h3>{studentName}</h3>
            <h3>GPA: {student.gpa}</h3>
            {this.state.student.campus==null?
            <h3>Student is not enrolled in any campus</h3>:
            <h3>{studentName} is enrolled in : {this.state.student.campus.name}</h3>
           }
            <select className="ui dropdown"
              value={this.state.selectedNewCampusValue}
              onChange={this.handleCampusChange}
            >
            <option value="" style= {{color: 'black'}}>Select campus...</option>
            {list}
            </select>
          </div>

          <br></br>

          <div id="buttons" onClick={this.handleChange}>
            <button className="ui red button">
              <p>Change Campus</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    student: state.getSingleStudent,
    allCampuses: state.getCampuses
  };
}

export default connect(mapStateToProps, {returnCurrentEditStudent})(SingleStudent);
