// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';


// IMPORT REDUCERS

import { FetchZipCodesReducer } from '../reducers/FetchZipCodesReducer';
import { LoginReducer } from '../reducers/LoginReducer';
import { DashboardReducer } from '../reducers/DashboardReducer';
import {WidgetReducer} from '../reducers/WidgetReducer';


// EXPORT APP REDUCER

export const AppReducer = combineReducers({
    zipCodes: FetchZipCodesReducer,
    LoginReducer,
    DashboardReducer,
    WidgetReducer
});