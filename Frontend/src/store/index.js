import { createStore } from "redux";

const initialState = {
  doctorName: "",
  doctorEmail: "",
  doctorQualification: "",
};

const loggedInDoctorReducer = (state = initialState, action) => {
  if (action.type === "doctorInfo") {
    return {
      ...state,
      doctorName: action.doc.name,
      doctorEmail: action.doc.username,
      doctorQualification: action.doc.qualification,
    };
  }

  return state;
};

const store = createStore(loggedInDoctorReducer);

export default store;
