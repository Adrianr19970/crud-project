import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { returnCurrentEditCampus } from '../actions';
import Student from './Student';
import { allStudentsThunk} from '../thunks';

class SingleCampus extends Component {
 
  componentDidMount(){
    this.props.getAllStudents();
  }
    
  

  constructor(props){
    super(props);

    this.state = {
      campus: {},
      students: this.props.students
    }

    

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);

    axios.get('/api/campuses/' + this.props.campus)
      .then(response => {
        let campus = response.data;
        this.setState({campus});
      })
      .catch(err => {
        console.log(err);
      })
  }

  onEdit = (event) => {
    this.props.returnCurrentEditCampus(this.state.campus.id);
  }

  onDelete = (event) => {
    axios.delete('/api/campuses/' + this.state.campus.id)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    window.location.replace('/campuslist')
  }

  render() {
    let view = this.state.campus;
    let students = [...this.props.students];

    let list = [];
    console.log(students[0]);
    if (students.length === 0 || students.length === undefined) {
      list.push(<p>There are no students registered on this campus</p>);
    } else {
        for(let i = 0; i < students.length; i++) {
          if(students[i].campusId === view.id) {
            let name = students[i].firstname + ' ' + students[i].lastname;
            list.push(
                        <Student image={students[i].image_path} student={name} campus={students[i].campus} id={students[i].id}/>
                      );
          }
        }
    }

    return (
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
          <h3>{view.name}</h3>
          <div id="editCampus">
            <img className="ui large image" src={view.image_path} alt={view.name} style={{marginLeft: '30%'}}/>
            <div>
              <p>Address: {view.address}</p>
              <p>Description: {view.description}</p>
            </div>
          </div>

          <br></br>

          <div id="buttons">
            <Link to='/editcampus'>
              <button onClick={this.onEdit}>
                <p>Edit Campus Info</p>
              </button>
            </Link>
            <button id="buttons" onClick={this.onDelete}>
              <p>Delete Campus</p>
            </button>
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
    campus: state.getSingleCampus,
    students: state.getStudents
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAllStudents: () => dispatch(allStudentsThunk()),
    returnCurrentEditCampus: returnCurrentEditCampus
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
