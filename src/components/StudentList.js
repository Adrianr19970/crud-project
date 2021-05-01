import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { allStudentsThunk, allCampusesThunk, singleStudentThunk, singleCampusThunk } from '../thunks';
import Student from './Student';

class StudentList extends Component {
  componentDidMount(){
    this.props.getAllStudents();
    this.props.getAllCampuses();
    this.props.getSingleStudent();
    this.props.getSingleCampus();
  }

  render(){
    console.log(this.props.student, this.props.campus);
    let list = [];
    let allStudents = this.props.allStudents;

    for(let i = 0; i < allStudents.length; i++){
      let name = allStudents[i].firstname + ' ' + allStudents[i].lastname;
      list.push(
                  <Student
                    image={allStudents[i].image_path}
                    student={name}
                    campus={allStudents[i].campus}
                    id={allStudents[i].id}
                  />
                );
    }

    if(allStudents.length === undefined || allStudents.length === 0){
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
            </div>
            <div id="studentList">
              <h2>All Students</h2>
            </div>
            <p>There are no students on this database</p>
            <Link id="buttons" to='/newstudent'>
              <button>
                <p>Add Student +</p>
              </button>
            </Link>
          </div>
        </div>
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
          </div>
          <div>
            <div id="studentList">
              <h2>All Students</h2>
            </div>
            <Link id="buttons" to='/newstudent'>
              <button>
                <p>Add Student +</p>
              </button>
            </Link>
          </div>
          <div className="ui container grid">
            <div className="ui row">
              {list}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allStudents: state.getStudents,
    student: state.getSingleStudent,
    campus: state.getSingleCampus
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllStudents: () => dispatch(allStudentsThunk()),
    getAllCampuses: () => dispatch(allCampusesThunk()),
    getSingleStudent: (id) => dispatch(singleStudentThunk(id)),
    getSingleCampus: (id) => dispatch(singleCampusThunk(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
