// IMPORT PACKAGE REFERENCES

import {React, Fragment} from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES

import { Header } from '../components/Header/Header';
import { DashboardPage } from '../components/pages/DashboardPage';
import { AboutPage } from '../components/pages/AboutPage';
import { ZipCodesPage } from '../components/pages/ZipCodesPage';


// COMPONENT
export const PrimaryLayout = () => (
    <Fragment>
        <Header />            
        <Switch>
            <Route path='/app' exact component={DashboardPage} />
            <Route path='/app/zipcodes' component={ZipCodesPage} />
            <Route path='/app/about' component={AboutPage} />
            <Redirect to='/app' />
        </Switch>
    </Fragment>
);