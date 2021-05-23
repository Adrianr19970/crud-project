export const getCampuses = (allCampuses = [], action) => {
  switch(action.type){
    case 'ALL_CAMPUSES':
      return action.payload;
    default:
      return allCampuses;
  }
}

export const getSingleCampus = (campus = null, action) => {
  switch(action.type){
    case 'GET_CAMPUS':
      return action.payload;
    default:
      return campus;
  }
}

export const getStudents = (allStudents = [], action) => {
  switch(action.type) {
    case 'ALL_STUDENTS':
      console.log( action.payload.length);
      return action.payload;
    default:
      return allStudents;
  }
}

export const getSingleStudent = (student = null, action) => {
  switch(action.type){
    case 'GET_STUDENT':
      return action.payload;
    default:
      return student;
  }
}

export const getCurrentEditCampus = (id = 0, action) => {
  switch (action.type) {
    case 'GET_EDIT_ID':
      return action.payload;
    default:
      return id;
  }
}

export const getCurrentEditStudent = (id = 0, action) => {
  switch (action.type) {
    case 'GET_EDIT_STUDENT':
      return action.payload;
    default:
      return id;

  }
}