import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import logo from './logo.svg';

const Home = () => {
  return(
    <div classname="App">
      <div className="App-header">
        <h2> Welcome to the React Campus Database </h2>
        <img src={logo} className="App-logo" alt="logo" />

        <h3> View Campuses/Students </h3>
        <div>
          <Link id="buttons" to="/campuslist">
            <button>
              <p>View Campuses</p>
            </button>
          </Link>
          <Link id="buttons" to="/studentlist">
            <button>
              <p>View Students</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home
