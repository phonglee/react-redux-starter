// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES
import {OrgChartView} from './OrgChartWidget.view';
import {toggleEmployees} from './OrgChartWidget.action';

export class OrgChartWidget extends Component {
    constructor(props) {
        super(props);
        this.onToggleEmp = this.onToggleEmp.bind(this);
    }

    onToggleEmp(widgetIndex, widgetId, empName) {
        toggleEmployees(widgetIndex, widgetId, empName);
    }

    render() {
        console.log(this.props);
        return <OrgChartView orgChartWidget={this}/>;
    }
}
