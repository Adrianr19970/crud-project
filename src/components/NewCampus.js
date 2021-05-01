import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  handleSubmit = (event) => {
    axios.post('http://localhost:5000/api/campuses',{
      'name': this.state.campus,
      'url': this.state.url,
      'location': this.state.location,
      'description': this.state.description,
      'population': 0
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
    window.location.replace('/campuslist');
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
          <form id="addCampus" onSubmit={this.handleSubmit}>
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
              <button type="submit">
                <p>Add Campus</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewCampus;
