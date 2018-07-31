// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES
import {DashboardLayout} from '../state/reducers/DashboardReducer';

export const Layout = ({editLayout, activeLayout, onChangeLayout}) => (
    <div className="container-fluid">
        <div className="row dashboard">
            <div className="col-6 dashboard-title">Dashboard Title</div>
            {
                editLayout &&
                <div className="col-6">
                    <span className="float-right">
                        <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                            <button onClick={onChangeLayout} 
                                value={DashboardLayout.DASHBOARD_ONE_COLUMN} 
                                type="button" 
                                className={activeLayout === DashboardLayout.DASHBOARD_ONE_COLUMN ? 'btn btn-light active' : 'btn btn-light'}>
                                <div className="layout-full"></div>
                            </button>
                            <button onClick={onChangeLayout} 
                                value={DashboardLayout.DASHBOARD_TWO_COLUMN} 
                                type="button" 
                                className={activeLayout === DashboardLayout.DASHBOARD_TWO_COLUMN ? 'btn btn-light active' : 'btn btn-light'}>
                                <div className="layout-half"></div>
                                <div className="layout-half"></div>
                            </button>
                            <button onClick={onChangeLayout} 
                                value={DashboardLayout.DASHBOARD_TWO_COLUMN_RIGHT} 
                                type="button" 
                                className={activeLayout === DashboardLayout.DASHBOARD_TWO_COLUMN_RIGHT ? 'btn btn-light active' : 'btn btn-light'}>
                                <div className="layout-quater"></div>
                                <div className="layout-threequater"></div>
                            </button>
                            <button onClick={onChangeLayout} 
                                value={DashboardLayout.DASHBOARD_TWO_COLUMN_LEFT} 
                                type="button" 
                                className={activeLayout === DashboardLayout.DASHBOARD_TWO_COLUMN_LEFT ? 'btn btn-light active' : 'btn btn-light'}>
                                <div className="layout-threequater"></div>
                                <div className="layout-quater"></div>
                            </button>
                            <button onClick={onChangeLayout} 
                                value={DashboardLayout.DASHBOARD_THREE_COLUMN} 
                                type="button" 
                                className={activeLayout === DashboardLayout.DASHBOARD_THREE_COLUMN ? 'btn btn-light active' : 'btn btn-light'}>
                                <div className="layout-quater"></div>
                                <div className="layout-quater"></div>
                                <div className="layout-quater"></div>
                            </button>
                            <button onClick={onChangeLayout} 
                                value={DashboardLayout.DASHBOARD_THREE_COLUMN_MIDDLE} 
                                type="button" 
                                className={activeLayout === DashboardLayout.DASHBOARD_THREE_COLUMN_MIDDLE ? 'btn btn-light active' : 'btn btn-light'}>
                                <div className="layout-halfhalf"></div>
                                <div className="layout-half"></div>
                                <div className="layout-halfhalf"></div>
                            </button>
                        </div>
                    </span>
                </div>
            }
        </div>
    </div>
);

Layout.propTypes = {
    activeLayout: PropTypes.string.isRequired,
    editLayout: PropTypes.bool.isRequired,
    onChangeLayout: PropTypes.func.isRequired
};
