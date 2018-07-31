// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES

import { DashboardPage } from '../pages/DashboardPage';
import { AboutPage } from '../pages/AboutPage';
import { ZipCodesPage } from '../pages/ZipCodesPage';
import {LoginPage} from '../pages/LoginPage';

// COMPONENT

export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Route path='/' component={LoginPage} exact={true} />
                <Route path='/dashboard' component={DashboardPage} />
                <Route path='/zipcodes' component={ZipCodesPage} />
                <Route path='/about' component={AboutPage} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);