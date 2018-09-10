// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES
import avatar from '../../../images/avatar.png';

export const OrgChartEmp = ({widget, emp, toggleEmp}) => (
    <li>
        <div className="emp-card">
            <div>
                <img className="card-avatar" src={avatar} height="90" />
                <div className="card-title">
                    <span>{emp.title}</span>
                    <span className="card-id">{emp.id}</span>
                </div>
            </div>
            <div className="emp-detail">
                <span>{emp.name}</span>
                <p className="detail-title">{emp.department}</p>
                <p className="detail-name">{emp.employeeId}</p>
                <p className="detail-email">@kms-technology.com</p>
            </div>
            <div className="emp-collapse" onClick={() => toggleEmp(widget.widgetIndex, widget.id, emp.name)}>
                <i className={emp.toggle ? 'fa fa-plus-circle' : 'fa fa-minus-circle'}></i>
            </div>
        </div>
        {emp.employees.length > 0 &&
            <ul className={emp.toggle ? 'hide-content' : ''}>
                {emp.employees.map((em, id) => <OrgChartEmp key={id} widget={widget} toggleEmp={toggleEmp} emp={widget.widgetDatasource.find((ds) => ds.name === em.name)}/>)}            
            </ul>
        }        
    </li>
);

OrgChartEmp.propTypes = {
    emp: PropTypes.object,
    toggleEmp: PropTypes.func,
    widget: PropTypes.object
};