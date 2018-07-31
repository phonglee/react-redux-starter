// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// IMPORT PROJECT REFERENCES

import { fetchZipCodes } from '../state/actions/ZipCodeActions';
import {addWidget} from '../../services/WidgetService';
//import { ZipCodeList } from '../ZipCodeBrowser/ZipCodeList';
// import { LoadingIndicator } from '../shared/LoadingIndicator/LoadingIndicator';
// import { Error } from '../shared/Error/Error';


// COMPONENT

class Widget extends Component {

    constructor(props) {
        super(props);
        this.onAddWidget = this.onAddWidget.bind(this);
    }

    componentDidMount() {
        this.props.fetchZipCodes();
    }

    componentWillMount() {
        console.log(this);
    }

    onAddWidget(e) {
        e.preventDefault();
        addWidget();
    }

    render() {
        return (            
            <div className="container-fluid">
                <div className="card-deck mb-3">
                    <div className="card mb-4 box-shadow">
                        <div className="card-header">
                            <span className="my-0 font-weight-bold text-left">Text Widget</span>
                            <span className="float-right">
                                <i className="fab fa fa-cog fa-1x widget-button" style={{color: 'white'}}></i>                            
                                <i className="fab fa fa-window-maximize fa-1x widget-button" style={{color: 'white'}}></i>
                                <i className="fab fa fa-window-close fa-1x widget-button" style={{color: 'white'}}></i>
                            </span>                            
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ mo</small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>10 users included</li>
                                <li>2 GB of storage</li>
                                <li>Email support</li>
                                <li>Help center access</li>
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
                        </div>
                    </div>
                    <div className="card mb-4 box-shadow">
                        <div className="card-header">
                            <span className="my-0 font-weight-bold text-left">Text Widget</span>
                            <span className="float-right">
                                <i className="fab fa fa-cog fa-1x widget-button" style={{color: 'white'}}></i>                            
                                <i className="fab fa fa-window-maximize fa-1x widget-button" style={{color: 'white'}}></i>
                                <i className="fab fa fa-window-close fa-1x widget-button" style={{color: 'white'}}></i>
                            </span>                            
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ mo</small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>10 users included</li>
                                <li>2 GB of storage</li>
                                <li>Email support</li>
                                <li>Help center access</li>
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
                        </div>
                    </div>
                    {this.props.addWidget &&
                        <div className="card mb-4 box-shadow">
                            <div className="card-header">
                                <span className="my-0 font-weight-bold text-left">Text Widget</span>
                                <span className="float-right">
                                    <i className="fab fa fa-cog fa-1x widget-button" style={{color: 'white'}}></i>                            
                                    <i className="fab fa fa-window-maximize fa-1x widget-button" style={{color: 'white'}}></i>
                                    <i className="fab fa fa-window-close fa-1x widget-button" style={{color: 'white'}}></i>
                                </span>                            
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ mo</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>10 users included</li>
                                    <li>2 GB of storage</li>
                                    <li>Email support</li>
                                    <li>Help center access</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
                            </div>
                        </div>
                    }
                    {this.props.editLayout && 
                        <div className="card mb-4 box-shadow">
                            <div className="card-header">
                                <span className="my-0 font-weight-bold text-left">Add Widget</span>
                                <span className="float-right">
                                    <i className="fab fa fa-cog fa-1x widget-button" style={{color: 'white'}}></i>
                                </span>                            
                            </div>
                            <div className="card-body add-widget center-block">
                                <i onClick={this.onAddWidget} className="fab fa fa-plus fa-5x" style={{color: 'darkgray', cursor: 'pointer'}}></i>
                            </div>
                        </div>
                    }                    
                </div>
            </div>
        );
    }
}

Widget.propTypes = {
    fetchZipCodes: PropTypes.func.isRequired,
    addWidget: PropTypes.bool,
    editLayout: PropTypes.bool,
    activeLayout: PropTypes.string
};


// CONFIGURE REACT REDUX

const mapStateToProps = state => {
    return {
        editLayout: state.DashboardReducer.editLayout,
        activeLayout: state.DashboardReducer.activeLayout,
        addWidget: state.WidgetReducer.addWidget
    };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchZipCodes }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(Widget);


// EXPORT COMPONENT

export { hoc as Widget };