// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';


// IMPORT REDUCERS
import { LoginReducer } from '../reducers/LoginReducer';
import { DashboardReducer } from '../reducers/DashboardReducer';

// EXPORT APP REDUCER

export const AppReducer = combineReducers({
    LoginReducer,
    DashboardReducer
});