import url from '../apis/URL';
import { returnCampuses, returnSingleCampus, returnStudents, returnSingleStudent} from '../actions';
const axios= require('axios');

export const allCampusesThunk = () => dispatch => {
  return url.get(`/api/campuses`)
  .then(res => res.data)
  .then(colleges => dispatch (returnCampuses(colleges)))
  .catch(err => console.log (err));
}

export const singleCampusThunk = id => dispatch => {
  return url.get('/api/campuses/' + id)
  .then(res => res.data)
  .then(college => dispatch (returnSingleCampus(college)))
  .catch(err => console.log (err));
}

export const allStudentsThunk = () => async(dispatch) => {
  return url.get(`/api/students`)
  .then(res => res.data)
  .then(students => dispatch(returnStudents (students)))
  .catch(err => console.log (err));
}

export const singleStudentThunk = id => dispatch => {
  return url.get('/api/students/' + id)
  .then(res => res.data)
  .then(student => dispatch (returnSingleStudent(student)))
  .catch(err => console.log (err));
}
