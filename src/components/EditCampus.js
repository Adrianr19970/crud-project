import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class EditCampus extends Component{
  constructor(props){
    super(props);

    this.state = {
      campus: '',
      location: '',
      url: '',
      description: '',
    }

    this.handleCampusInput = this.handleCampusInput.bind(this);
    this.handleLocationInput = this.handleLocationInput.bind(this);
    this.handleURLInput = this.handleURLInput.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCampusInput = (data) => 
  {
    this.setState({campus: data.target.value});
  }

  handleLocationInput = (data) => 
  {
    this.setState({location: data.target.value});
  }

  handleURLInput = (data) => 
  {
    this.setState({url: data.target.value});
  }

  handleDescriptionInput = (data) => 
  {
    this.setState({description: data.target.value});
  }

  handleSubmit = (event) => {
    axios.put('http://localhost:5000/api/campuses/' + this.props.id, 
    {
      "newName": this.state.campus,
      "newImage": this.state.url,
      "newAddress": this.state.location,
      "newDescription": this.state.description
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    })
    window.location.replace('/campuslist')
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

          <form id="addCampus" onSubmit={this.handleSubmit}>
            <div>
            <h3>Edit Campus Information</h3>
              <div>
                <label>New Campus Name: </label>
                <input type="text" name="campus" onChange={this.handleCampusInput} required/>
              </div>
              <div>
                <label>New Campus Location: </label>
                <input type="text" name="location" onChange={this.handleLocationInput} required/>
              </div>
              <div>
                <label>New Image URL: </label>  
                <input type="text" name="image" onChange={this.handleURLInput}/>
              </div>
              <div>
                <label>New Description: </label> 
                <input type="text" name="description"onChange={this.handleDescriptionInput} required/>
              </div>

              <br></br>

              <div id="buttons">
                <button type="submit">
                  <p>Edit Campus</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.getCurrentEditCampus
  };
}

export default connect(mapStateToProps)(EditCampus);
