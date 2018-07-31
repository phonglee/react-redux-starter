// IMPORT PACKAGE REFERENCES

import {React} from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES

import {LoginPage} from '../components/pages/LoginPage';


// COMPONENT
export const UnauthorizedLayout = () => (
    <div>
        <Switch>
            <Route path='/auth/login' component={LoginPage} />
            <Redirect to='/auth/login'/>
        </Switch>
    </div>
);