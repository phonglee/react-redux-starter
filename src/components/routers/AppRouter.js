// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES

import { DashboardPage } from '../pages/DashboardPage';
import {LoginPage} from '../pages/LoginPage';

// COMPONENT

export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Route path='/' component={LoginPage} exact={true} />
                <Route path='/dashboard' component={DashboardPage} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);