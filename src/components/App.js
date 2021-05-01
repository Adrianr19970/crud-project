import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import CampusList from './CampusList';
import NewCampus from './NewCampus';
import EditCampus from './EditCampus';
import SingleCampus from './SingleCampus';
import StudentList from './StudentList';
import NewStudent from './NewStudent';
import EditStudent from './EditStudent';
import SingleStudent from './SingleStudent';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact render=
            {
              () => {
                return (<Home/>);
              }
            } />
          <Route path="/campuslist" exact render=
            {
              () => {
                return (<CampusList/>);
              }
            } />
          <Route path="/studentlist" exact render=
            {
              () => {
                return (<StudentList/>);
              }
            } />
          <Route path="/newcampus" exact render=
            {
              () => {
                return (<NewCampus/>);
              }
            } />
          <Route path="/newstudent" exact render=
            {
              () => {
                return (<NewStudent/>);
              }
            } />
          <Route path="/editcampus" exact render=
            {
              () => {
                return (<EditCampus/>);
              }
            } />
          <Route path="/editstudent" exact render=
            {
              () => {
                return (<EditStudent/>);
              }
            } />
          <Route path="/singlecampus" exact render=
            {
              () => {
                return (<SingleCampus/>);
              }
            } />
          <Route path="/singlestudent" exact render=
            {
              () => {
                return (<SingleStudent/>);
              }
            } />
        </div>
      </Router>
    );
  }
}

export default App;
