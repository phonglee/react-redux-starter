// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES
import {WidgetType} from '../state/reducers/WidgetReducer';

export const DatatableWidget = ({widget, dragColumn, dropColumn, allowDropColumn, changeDS, changePageIndex}) => (
    <div className="row">
        {widget.editMode && 
            <div className={widget.widgetType !== WidgetType.CHOOSE ? 'container-fluid widget-content' : 'container-fluid'}>
                <div className="row">
                    <div className="col-md-4 mb-3 mt-2">
                        <label className="widget-title" htmlFor="datasource">Data source:</label>
                        <select onChange={changeDS} value={widget.activeDS} className="custom-select d-block w-100" id="datasource">
                            {widget.widgetDatasource.map((datasource, id) => <option key={id} value={datasource.name}>{datasource.name}</option>)}                            
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="widget-title">Columns:</label>
                        <div className="datasource-column"
                            id="ds-columns"
                            onDragOver={allowDropColumn}
                            onDrop={dropColumn}>
                            {widget.columns.map((column, key) => 
                                <div className="column-name" 
                                    key={key} 
                                    draggable
                                    onDragStart={dragColumn}
                                    id={column.id}
                                    value={column.id}>{column.value}</div>)
                            }
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="widget-title" >Selected columns:</label>
                        <div className="datasource-column"
                            id="ds-selectedColumns"
                            onDragOver={allowDropColumn}
                            onDrop={dropColumn}>
                            {widget.selectedColumns.map((column, key) => 
                                <div className="column-name" 
                                    key={key} 
                                    draggable
                                    onDragStart={dragColumn}
                                    id={column.id}
                                    value={column.id}>{column.value}</div>)
                            }
                        </div>
                    </div>
                </div>        
            </div>
        }
        {!widget.editMode &&
            <div className="col datasource-padding">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <span>{widget.rowStart + 1} to {widget.rowEnd > widget.totalRow ? widget.totalRow : widget.rowEnd} of {widget.totalRow} {widget.activeDS}</span>     
                        </div>
                        <div className="col-md-6">
                            <div className="btn-group float-right" role="group" aria-label="Basic example">
                                <button value={widget.currentPage - 1} onClick={changePageIndex} type="button" className={widget.currentPage === 1 ? 'btn btn-light btn-pagination disabled':'btn btn-light btn-pagination'}>&#10096;</button>
                                {[...Array(widget.pagesDisplayed)].map((index, key) =>
                                    <button 
                                        key={key} 
                                        type="button"
                                        value={key + 1}
                                        onClick={changePageIndex}
                                        className={widget.currentPage === key + 1 ? 'btn btn-light btn-pagination active' : 'btn btn-light btn-pagination'}>
                                        {key + 1}
                                    </button>
                                )}
                                <button value={widget.currentPage + 1} onClick={changePageIndex}  type="button" className={widget.currentPage === widget.pagesDisplayed ? 'btn btn-light btn-pagination disabled':'btn btn-light btn-pagination'}>&#10097;</button>
                            </div>
                        </div>
                    </div>
                </div>                
                <div className="table-responsive" style={{marginTop: '5px', overflowY: 'auto', height: widget.fullScreen ? 'auto' : widget.widgetConfig.height - 120}}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {
                                    widget.widgetDatasource.map((ds) => {
                                        if (ds.name === widget.activeDS) {
                                            return ds.columns.map((col, key) => {
                                                return (
                                                    <th key={key} className={widget.selectedColumns.includes(col) ? '':'column-hidden'}>{col.value}</th>
                                                );
                                            });                                    
                                        }                                
                                    })
                                }                                
                            </tr>
                        </thead>
                        <tbody>                            
                            {
                                widget.widgetDatasource.map((ds) => {
                                    if (ds.name === widget.activeDS) {
                                        return ds.data.map((row, key) => {
                                            if (key >= widget.rowStart && key < widget.rowEnd) {
                                                return (
                                                    <tr scope="row" key={key}>
                                                        {
                                                            row.map((col, key) => <td className={widget.selectedColumns.includes(ds.columns[key]) ? '':'column-hidden'}  key={key}>{col}</td>)
                                                        }
                                                    </tr>
                                                );
                                            }                                            
                                        });                                    
                                    }                                
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>             
        }
    </div>
    
);

DatatableWidget.propTypes = {
    widget: PropTypes.shape({
        editMode: PropTypes.bool.isRequired
    }),
    dragColumn: PropTypes.func.isRequired,
    dropColumn: PropTypes.func.isRequired,
    allowDropColumn: PropTypes.func.isRequired,
    changeDS: PropTypes.func.isRequired,
    changePageIndex: PropTypes.func.isRequired
};