import React, { Component } from 'react';
import { connect } from 'react-redux';
import { returnCurrentEditCampus, returnSingleCampus } from '../actions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import url from '../apis/URL';
import {withRouter} from 'react-router-dom';

class NewCampus extends Component{
  constructor(props){
      super(props);

      this.state = {
        campus: '',
        location: '',
        url: '',
        description: ''
      }

      this.handleCampusInput = this.handleCampusInput.bind(this);
      this.handleLocationInput = this.handleLocationInput.bind(this);
      this.handleURLInput = this.handleURLInput.bind(this);
      this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCampusInput = (data) => {
    this.setState({campus: data.target.value});
  }

  handleLocationInput = (data) => {
    this.setState({location: data.target.value});
  }

  handleURLInput = (data) => {
    this.setState({url: data.target.value});
  }

  handleDescriptionInput = (data) => {
    this.setState({description: data.target.value});
  }

  handleSubmit = async() => {
    let temp=0;
    await axios.post('http://localhost:5000/api/campuses/',{
      name: this.state.campus,
      image: this.state.url,
      address: this.state.location,
      description: this.state.description
    }).then(response => {
      console.log(response);
      temp=response.data.id;
    }).catch(err => {
      console.log(err);
    });
    console.log(temp);
    this.props.returnSingleCampus(temp);
    this.props.history.push('/singlecampus')
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
          <h2>Add New Campus</h2>
          
            <div>
                <label>Campus Name: </label>
                <input type="text" name="campus" onChange={this.handleCampusInput} required/>
            </div>
            <div>
                <label>Campus Location: </label>
                <input type="text" name="location" onChange={this.handleLocationInput} required/>
            </div>
            <div>
                <label>Campus Image URL: </label>
                <input type="text" name="image" onChange={this.handleURLInput}/>
            </div>
            <div>
                <label>Campus Description: </label>
                <input type="text" name="description" onChange={this.handleDescriptionInput} required/>
            </div>

            <br></br>

            <div id="buttons">
              <button type="submit" onClick={this.handleSubmit}>
                <p>Add Campus</p>
              </button>
            </div>
          
        </div>
      </div>
    );
  }
}


export default withRouter(connect(null,{returnSingleCampus}) (NewCampus));
