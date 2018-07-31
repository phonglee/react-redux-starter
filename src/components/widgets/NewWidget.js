// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES

export const NewWidget = ({onAddWidget, widgetIndex}) => (
    <div className="col-auto widget-padding">
        <div className="card mb-3 box-shadow" style={{ width: '400px', height: '300px' }}>
            <div className="card-header">
                <span className="my-0 font-weight-bold text-left">Add Widget</span>
                <span className="float-right">
                    <i className="fab fa fa-cog fa-1x widget-button"></i>
                </span>
            </div>
            <div className="card-body add-widget center-block">
                <i onClick={() => onAddWidget(widgetIndex)} className="fab fa fa-plus fa-5x" style={{ color: 'darkgray', cursor: 'pointer' }}></i>
            </div>
        </div>
    </div>
);

NewWidget.propTypes = {
    onAddWidget: PropTypes.func.isRequired,
    widgetIndex: PropTypes.string.isRequired
};
