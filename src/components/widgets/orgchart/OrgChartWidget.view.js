// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES
import {WidgetType} from '../../state/reducers/DashboardReducer';
import {OrgChartEmp} from './OrgChartEmp';

export const OrgChartView = ({ orgChartWidget }) => (
    <div className="row">
        {orgChartWidget.props.widget.editMode &&
            <div className={orgChartWidget.props.widget.widgetType !== WidgetType.CHOOSE ? 'container-fluid widget-content' : 'container-fluid'}>
                <div className="row">
                    <div className="col-md-6 mb-3 mt-2">
                        <label className="widget-title" htmlFor="datasource">Root contact:</label>
                        <select onChange={orgChartWidget.props.changeDS} value={orgChartWidget.props.widget.activeDS} className="custom-select d-block w-100" id="datasource">
                            {orgChartWidget.props.widget.widgetDatasource.map((datasource, id) => <option key={id} value={datasource.name}>{datasource.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        }
        <div className="container-fluid org-chart">            
            <div className="tree">
                <ul>
                    <OrgChartEmp widget={orgChartWidget.props.widget} toggleEmp={orgChartWidget.onToggleEmp} emp={orgChartWidget.props.widget.widgetDatasource.find(ds => {return ds.name === orgChartWidget.props.widget.activeDS;})}/>
                </ul>                
            </div>
        </div>        
    </div>
);

OrgChartView.propTypes = {
    orgChartWidget: PropTypes.object
};