// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES
import {WidgetOption, WidgetType} from '../state/reducers/DashboardReducer';
import {DatatableWidget} from './DatatableWidget';
import {TextWidget} from './TextWidget';
import {TodoListWidget} from './todolist';
import {OrgChartWidget} from './orgchart';

export const TemplateWidget = ({widget, deleteWidget, updateTitle, updateWidth, updateHeight, updateType, setFullScreen, updateSetting,
    dragColumn, dropColumn, allowDropColumn, changeDS, changePageIndex}) => (
    <div className="col-auto widget-padding">
        <div className={widget.fullScreen ? 'card mb-4 box-shadow widget-fullscreen' : 'card mb-4 box-shadow'} style={{width: widget.fullScreen ? 'auto' : widget.widgetConfig.width, height: widget.fullScreen || widget.editMode ? 'auto' : widget.widgetConfig.height}}>
            <div className="card-header">
                <span className="my-0 font-weight-bold text-left">{widget.widgetTitle}</span>
                <span className="float-right">
                    <i onClick={updateSetting} className="fab fa fa-cog fa-1x widget-button"></i>
                    <i onClick={setFullScreen} className={widget.fullScreen ? 'fab fa fa-window-minimize fa-1x widget-button':'fab fa fa-window-maximize fa-1x widget-button'}></i>
                    <i onClick={deleteWidget} className="fab fa fa-window-close fa-1x widget-button"></i>
                </span>
            </div>
            <div className="card-body">
                {widget.editMode && 
                    <div className="row">
                        <div className="container-fluid">
                            <label className="widget-title" htmlFor="title">Widget title:</label>
                            <input type="text" name='title' id='title' onChange={updateTitle} placeholder="New widget" className="form-control input-space" autoFocus />
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="widget-title" htmlFor="country">Widget type:</label>
                                    <select onChange={updateType} className="custom-select d-block w-100" value={widget.widgetType} id="country" required="">
                                        {WidgetOption.map((type) => <option key={type.id} value={type.name}>{type.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="widget-title" htmlFor="width">Min width:</label>
                                    <input type="number" name='width' onChange={updateWidth} value={widget.widgetConfig.width} className="form-control input-space"/>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="widget-title" htmlFor="height">Min height:</label>
                                    <input type="number" name='height' onChange={updateHeight} value={widget.widgetConfig.height} className="form-control input-space" />
                                </div>
                            </div>                    
                        </div>
                    </div>
                }
                {(() => {
                    switch (widget.widgetType) {
                        case WidgetType.TEXT_WIDGET:
                            return <TextWidget widget={widget} />;
                        case WidgetType.DATATABLE_WIDGET:
                            return <DatatableWidget  
                                widget={widget} 
                                dragColumn={dragColumn} 
                                dropColumn={dropColumn} 
                                allowDropColumn={allowDropColumn}
                                changeDS={changeDS}
                                changePageIndex = {changePageIndex}
                            />;
                        case WidgetType.ORGCHART_WIDGET:
                            return <OrgChartWidget widget={widget} changeDS={changeDS}/>;
                        case WidgetType.TODOLIST_WIDGET:
                            return <TodoListWidget widget={widget}/>;
                        case WidgetType.SIMPLECHART_WIDGET:
                            return <div>Simple Chart</div>;
                        case WidgetType.STOCKSTICKER_WIDGET:
                            return <div>Stock Sticker</div>;
                        default:
                            return <div>Please select widget type!</div>;
                    }
                })()}
            </div>
        </div>
    </div>    
);

TemplateWidget.propTypes = {
    widget: PropTypes.shape({
        widgetTitle: PropTypes.string.isRequired,
        widgetConfig: PropTypes.object.isRequired,
        widgetType: PropTypes.string.isRequired,
        fullScreen: PropTypes.bool.isRequired
    }),
    deleteWidget: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateWidth: PropTypes.func.isRequired,
    updateHeight: PropTypes.func.isRequired,
    updateType: PropTypes.func.isRequired,
    setFullScreen: PropTypes.func.isRequired,
    updateSetting: PropTypes.func.isRequired,
    dragColumn: PropTypes.func.isRequired,
    dropColumn: PropTypes.func.isRequired,
    allowDropColumn: PropTypes.func.isRequired,
    changeDS: PropTypes.func.isRequired,
    changePageIndex: PropTypes.func.isRequired
};
