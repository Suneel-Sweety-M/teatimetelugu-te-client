import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice"; 

const rootReducer = combineReducers({
  te_teatimetelugu: userReducer,  
});

export default rootReducer;
