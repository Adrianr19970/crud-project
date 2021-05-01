import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { returnCurrentEditStudent } from '../actions';
import url from '../apis/URL';

class SingleStudent extends Component{
  constructor(props){
    super(props);

    this.state = {
      selectedNewCampus: '',
      student: {},
      studentsCampus: {}
    }

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.onSubmitCampusChange = this.onSubmitCampusChange.bind(this);

    url.get('/api/students/' + this.props.student)
      .then(response => {
        let student = response.data;
        this.setState({student});
      })
      .catch(err => {
        console.log(err);
      })

    url.get('/api/campuses/' + this.student.campusId)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  }

  onEdit = (event) => {
    console.log('Edit');
  }

  onDelete = (event) => {
    console.log('delete');
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
    let list = [];
    let allCampuses = this.props.allCampuses;
    let student = this.state.student;
    let studentName = student.firstName + student.lastName;

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

            <select className="ui dropdown"
              value={this.state.selectedNewCampusValue}
              onChange={this.handleCampusChange}
            >
            <option value="" style= {{color: 'black'}}>Select campus...</option>
            {list}
            </select>
          </div>

          <br></br>

          <div id="buttons">
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
