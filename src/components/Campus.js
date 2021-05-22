import React, { Component } from 'react';
import { connect } from 'react-redux';
import { returnCurrentEditCampus, returnSingleCampus } from '../actions';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Campus extends Component {
  constructor(props) {
    super(props);

    this.onViewCampus = this.onViewCampus.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onViewCampus = (event) => {
    this.props.returnSingleCampus(this.props.id);

  }

  onEdit = (event) => {
    this.props.returnCurrentEditCampus(this.props.id);
  }

  onDelete = (event) => {
    axios.delete('api/campuses/' + this.props.id)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    window.location.replace('/CampusList')
  }

  render() {
    if (this.props.delete) {
      return (
        <div className="column four wide" style={{ margin: '4%' }}>
          <div className="ui linked cards">
            <div className="card">
              <div className="image">
                <img className="ui small image" src={this.props.image} alt="Campus" />
              </div>
              <div>
                <div className="header">
                  {this.props.campus}
                </div>
                <div>
                  {this.props.numOfStudents} Students
                </div>
                <Link id="buttons" to="/singlecampus">
                  <button onClick={this.onViewCampus}>
                    <p>View Campus</p>
                  </button>
                </Link>
              </div>
              <div>
                <div id="buttons">
                  <button onClick={this.onEdit}>
                    <Link to='/editcampus'>
                      <p>Edit</p>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="column four wide" style={{ margin:'4%'}}>
        <div className="ui linked cards">
          <div className="card">
            <div className="image">
              <img src={this.props.image} alt="Campus" />
            </div>
            <div>
              <div className="header">
                {this.props.campus}
              </div>
              <div>
                {this.props.numOfStudents} Students
              </div>
              <Link id="buttons" to='/singlecampus'>
                <button onClick={this.onViewCampus}> 
                  <p>View Campus</p> 
                </button>
              </Link>
            </div>
            <div>
              <div id="buttons">
                <button onClick={this.onEdit}>
                  <Link to='/editcampus'>
                    <p>Edit</p>
                  </Link>
                </button>
                <div id="buttons">
                  <button onClick={this.onDelete}>
                    <p>Delete</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { returnCurrentEditCampus, returnSingleCampus })(Campus);
