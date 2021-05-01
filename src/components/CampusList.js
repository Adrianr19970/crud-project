import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { allCampusesThunk } from '../thunks';
import Campus from './Campus'

class CampusList extends Component {
  componentDidMount(){
      this.props.getAllCampuses();
  }

  render(){
    let list = [];
    let allCampuses = this.props.allCampuses;

    for(let i = 0; i < allCampuses.length; i++){
      list.push(
                  <Campus
                    image={allCampuses[i].image_path}
                    campus={allCampuses[i].name}
                    numOfStudents={allCampuses[i].students.length}
                    id={allCampuses[i].id}
                  />
                );
    }

    if(allCampuses.length === undefined || allCampuses.length === 0){
      return(
        <div className="App">
          <div className="App-header">
            <div>
              <Link id="buttons" to="/">
                <button>
                  <p>Home</p>
                </button>
              </Link>
              <Link id="buttons" to="/studentlist">
                <button>
                  <p>View Students</p>
                </button>
              </Link>
            </div>
            <div id="campusList">
              <h2>All Campuses</h2>
            </div>
            <p>There are no campuses on this database</p>
            <Link id="buttons" to='/newcampus'>
              <button>
                <p>Add Campus +</p>
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
            <Link id="buttons" to="/studentlist">
              <button>
                <p>View Students</p>
              </button>
            </Link>
          </div>
          <div>
            <h2>All Campuses</h2>
            <Link id="buttons" to='/newcampus'>
              <button>
                <p>Add Campus +</p>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCampuses: () => dispatch(allCampusesThunk())
  }
}

const mapStateToProps = (state) => {
  return {
    allCampuses: state.getCampuses
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);
