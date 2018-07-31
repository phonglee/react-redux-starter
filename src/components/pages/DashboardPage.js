// IMPORT PACKAGE REFERENCES

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// IMPORT PROJECT REFERENCES
import { Header } from '../Header/Header';
//import { Widget } from '../widgets/widget';
import {Layout} from '../widgets/Layout';
import {TemplateWidget} from '../widgets/TemplateWidget';
import {NewWidget} from '../widgets/NewWidget';
import {DashboardLayout} from '../state/reducers/DashboardReducer';
import {setLayout, addWidget, deleteWidget, updateTitle, updateWidth, updateHeight, 
    updateType, updateSetting, setFullScreen, moveColumnDS, updateDS, changePageIndex} from '../../services/DashboardService';
//import datasource from '../../services/datasource.json';

// COMPONENT
class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.onChangeLayout = this.onChangeLayout.bind(this);
        this.onAddWidget = this.onAddWidget.bind(this);
        this.onDeleteWidget = this.onDeleteWidget.bind(this);
        this.onUpdateWidgetTitle = this.onUpdateWidgetTitle.bind(this);
        this.onUpdateWidgetWidth = this.onUpdateWidgetWidth.bind(this);
        this.onUpdateWidgetHeight = this.onUpdateWidgetHeight.bind(this);
        this.onUpdateWidgetType = this.onUpdateWidgetType.bind(this);
        this.onSetFullScreen = this.onSetFullScreen.bind(this);
        this.onUpdateSetting = this.onUpdateSetting.bind(this);
        this.onDragColumn = this.onDragColumn.bind(this);
        this.onDropColumn = this.onDropColumn.bind(this);
        this.onAllowDropColumn = this.onAllowDropColumn.bind(this);
        this.onChangeDS = this.onChangeDS.bind(this);
        this.onChangePageIndex = this.onChangePageIndex.bind(this);
    }

    onChangeLayout(e) {
        e.preventDefault();
        //console.log(this.props.activeLayout + ' to ' + e.currentTarget.value);
        setLayout(e.currentTarget.value);
    }

    onAddWidget(widgetIndex) {
        addWidget(widgetIndex);
    }

    onDeleteWidget(widgetIndex, widgetId) {
        //console.log('remove ' + widgetIndex + ':' + widgetId);
        deleteWidget(widgetIndex, widgetId);
    }

    onUpdateWidgetTitle(e, widgetIndex, widgetId) {
        //console.log('New title ' + e.currentTarget.value);
        updateTitle(widgetIndex, widgetId, e.currentTarget.value);
    }

    onUpdateWidgetWidth(e, widgetIndex, widgetId) {
        // console.log('New width ' + e.currentTarget.value);
        updateWidth(widgetIndex, widgetId, e.currentTarget.value);
    }

    onUpdateWidgetHeight(e, widgetIndex, widgetId) {
        //console.log('New height ' + e.currentTarget.value);
        updateHeight(widgetIndex, widgetId, e.currentTarget.value);
    }

    onUpdateWidgetType(e, widgetIndex, widgetId) {
        //console.log('New type ' + e.currentTarget.value + 'for' + widgetIndex + ':' + widgetId);
        e.preventDefault();
        updateType(widgetIndex, widgetId, e.currentTarget.value);
    }

    onSetFullScreen(e, widgetIndex, widgetId, fullScreen) {
        //console.log('Full screen mode ' + fullScreen);
        e.preventDefault();
        setFullScreen(widgetIndex, widgetId, fullScreen);
    }

    onUpdateSetting(e, widgetIndex, widgetId, editMode) {
        console.log('Update setting' + editMode);
        e.preventDefault();
        updateSetting(widgetIndex, widgetId, editMode);
    }

    onDragColumn(e, widgetIndex, widgetId) {
        e.dataTransfer.setData('widgetId', widgetId);
        e.dataTransfer.setData('widgetIndex', widgetIndex);
        e.dataTransfer.setData('columnId', e.target.id);
        e.dataTransfer.setData('sourceId', e.target.parentElement.id);
    }

    onDropColumn(e) {
        e.preventDefault();
        let sourceId = e.dataTransfer.getData('sourceId');
        if (sourceId !== e.target.id && sourceId !== e.target.parentElement.id) {
            let widgetId = e.dataTransfer.getData('widgetId');
            let widgetIndex = e.dataTransfer.getData('widgetIndex');
            let columnId = e.dataTransfer.getData('columnId');
            moveColumnDS(widgetIndex, parseInt(widgetId), columnId);
        }        
    }

    onAllowDropColumn(e) {
        e.preventDefault();
    }

    onChangeDS(e, widgetIndex, widgetId) {        
        e.preventDefault();
        updateDS(widgetIndex, widgetId, e.currentTarget.value);
    }

    onChangePageIndex(e, widgetIndex, widgetId) {
        //console.log('New pageIndex ' + e.currentTarget.value + 'for' + widgetIndex + ':' + widgetId);
        if (e.currentTarget.className.indexOf('disabled') < 0) {
            e.preventDefault();
            changePageIndex(widgetIndex, widgetId, parseInt(e.currentTarget.value));
        }         
    }

    // componentDidMount() {
    //     console.log(datasource);
    // }
    // componentWillMount() {
    //     console.log(this);
    // }

    render() {
        console.log(this.props);
        return (
            <div>
                <Header history={this.props.history}/>
                <Layout editLayout={this.props.editLayout} activeLayout ={this.props.activeLayout} onChangeLayout={this.onChangeLayout} />
                {/* <Widget /> */}
                <div className="container-fluid">
                    {this.props.activeLayout === DashboardLayout.DASHBOARD_ONE_COLUMN &&
                        <div className="row">
                            <div className="col">
                                <div className="card-deck">
                                    {this.props.widgets1.map( widget => { 
                                        return <TemplateWidget 
                                            deleteWidget={() => this.onDeleteWidget(widget.widgetIndex, widget.id)}
                                            updateTitle={(e) => this.onUpdateWidgetTitle(e, widget.widgetIndex, widget.id)}
                                            updateWidth={(e) => this.onUpdateWidgetWidth(e, widget.widgetIndex, widget.id)}
                                            updateHeight={(e) => this.onUpdateWidgetHeight(e, widget.widgetIndex, widget.id)}
                                            updateType={(e) => this.onUpdateWidgetType(e, widget.widgetIndex, widget.id)}
                                            setFullScreen = {(e) => this.onSetFullScreen(e, widget.widgetIndex, widget.id, !widget.fullScreen)}
                                            updateSetting = {(e) => this.onUpdateSetting(e, widget.widgetIndex, widget.id, !widget.editMode)}
                                            dragColumn = {e => this.onDragColumn(e, widget.widgetIndex, widget.id)}
                                            dropColumn = {e => this.onDropColumn(e)}
                                            allowDropColumn = {e => this.onAllowDropColumn(e)}
                                            changeDS = {e => this.onChangeDS(e, widget.widgetIndex, widget.id)}
                                            changePageIndex = {e => this.onChangePageIndex(e, widget.widgetIndex, widget.id)}
                                            key={widget.id} 
                                            widget={widget}/>;
                                    })}
                                    {this.props.widgets2.map( widget => { 
                                        return <TemplateWidget 
                                            deleteWidget={() => this.onDeleteWidget(widget.widgetIndex, widget.id)}
                                            updateTitle={(e) => this.onUpdateWidgetTitle(e, widget.widgetIndex, widget.id)}
                                            updateWidth={(e) => this.onUpdateWidgetWidth(e, widget.widgetIndex, widget.id)}
                                            updateHeight={(e) => this.onUpdateWidgetHeight(e, widget.widgetIndex, widget.id)}
                                            updateType={(e) => this.onUpdateWidgetType(e, widget.widgetIndex, widget.id)}
                                            setFullScreen = {(e) => this.onSetFullScreen(e, widget.widgetIndex, widget.id, !widget.fullScreen)}
                                            updateSetting = {(e) => this.onUpdateSetting(e, widget.widgetIndex, widget.id, !widget.editMode)}
                                            dragColumn = {e => this.onDragColumn(e)}
                                            dropColumn = {e => this.onDropColumn(e)}
                                            allowDropColumn = {e => this.onAllowDropColumn(e)}
                                            changeDS = {e => this.onChangeDS(e, widget.widgetIndex, widget.id)}
                                            changePageIndex = {e => this.onChangePageIndex(e, widget.widgetIndex, widget.id)}
                                            key={widget.id} 
                                            widget={widget}/>;
                                    })}
                                    {this.props.widgets3.map( widget => { 
                                        return <TemplateWidget 
                                            deleteWidget={() => this.onDeleteWidget(widget.widgetIndex, widget.id)}
                                            updateTitle={(e) => this.onUpdateWidgetTitle(e, widget.widgetIndex, widget.id)}
                                            updateWidth={(e) => this.onUpdateWidgetWidth(e, widget.widgetIndex, widget.id)}
                                            updateHeight={(e) => this.onUpdateWidgetHeight(e, widget.widgetIndex, widget.id)}
                                            updateType={(e) => this.onUpdateWidgetType(e, widget.widgetIndex, widget.id)}
                                            setFullScreen = {(e) => this.onSetFullScreen(e, widget.widgetIndex, widget.id, !widget.fullScreen)}
                                            updateSetting = {(e) => this.onUpdateSetting(e, widget.widgetIndex, widget.id, !widget.editMode)}
                                            dragColumn = {e => this.onDragColumn(e)}
                                            dropColumn = {e => this.onDropColumn(e)}
                                            allowDropColumn = {e => this.onAllowDropColumn(e)}
                                            changeDS = {e => this.onChangeDS(e, widget.widgetIndex, widget.id)}
                                            changePageIndex = {e => this.onChangePageIndex(e, widget.widgetIndex, widget.id)}
                                            key={widget.id} 
                                            widget={widget}/>;
                                    })}
                                    {this.props.editLayout && <NewWidget onAddWidget={this.onAddWidget} widgetIndex="1"/>}
                                    {/* <NewWidget onAddWidget={this.onAddWidget} widgetIndex="1"/> */}
                                </div>                                
                            </div>
                        </div>
                    }
                    {this.props.activeLayout === DashboardLayout.DASHBOARD_TWO_COLUMN &&
                        <div className="row">
                            <div className="col-6">
                                <div className="card-deck">
                                    {this.props.widgets1.map( widget => { 
                                        return <TemplateWidget 
                                            deleteWidget={() => this.onDeleteWidget(widget.widgetIndex, widget.id)}
                                            updateTitle={(e) => this.onUpdateWidgetTitle(e, widget.widgetIndex, widget.id)}
                                            updateWidth={(e) => this.onUpdateWidgetWidth(e, widget.widgetIndex, widget.id)}
                                            updateHeight={(e) => this.onUpdateWidgetHeight(e, widget.widgetIndex, widget.id)}
                                            updateType={(e) => this.onUpdateWidgetType(e, widget.widgetIndex, widget.id)}
                                            setFullScreen = {(e) => this.onSetFullScreen(e, widget.widgetIndex, widget.id, !widget.fullScreen)}
                                            updateSetting = {(e) => this.onUpdateSetting(e, widget.widgetIndex, widget.id, !widget.editMode)}
                                            dragColumn = {e => this.onDragColumn(e, widget.widgetIndex, widget.id)}
                                            dropColumn = {e => this.onDropColumn(e)}
                                            allowDropColumn = {e => this.onAllowDropColumn(e)}
                                            changeDS = {e => this.onChangeDS(e, widget.widgetIndex, widget.id)}
                                            changePageIndex = {e => this.onChangePageIndex(e, widget.widgetIndex, widget.id)}
                                            key={widget.id} 
                                            widget={widget}/>;
                                    })}
                                    {this.props.widgets3.map( widget => { 
                                        return <TemplateWidget 
                                            deleteWidget={() => this.onDeleteWidget(widget.widgetIndex, widget.id)}
                                            updateTitle={(e) => this.onUpdateWidgetTitle(e, widget.widgetIndex, widget.id)}
                                            updateWidth={(e) => this.onUpdateWidgetWidth(e, widget.widgetIndex, widget.id)}
                                            updateHeight={(e) => this.onUpdateWidgetHeight(e, widget.widgetIndex, widget.id)}
                                            updateType={(e) => this.onUpdateWidgetType(e, widget.widgetIndex, widget.id)}
                                            setFullScreen = {(e) => this.onSetFullScreen(e, widget.widgetIndex, widget.id, !widget.fullScreen)}
                                            updateSetting = {(e) => this.onUpdateSetting(e, widget.widgetIndex, widget.id, !widget.editMode)}
                                            dragColumn = {e => this.onDragColumn(e, widget.widgetIndex, widget.id)}
                                            dropColumn = {e => this.onDropColumn(e)}
                                            allowDropColumn = {e => this.onAllowDropColumn(e)}
                                            changeDS = {e => this.onChangeDS(e, widget.widgetIndex, widget.id)}
                                            changePageIndex = {e => this.onChangePageIndex(e, widget.widgetIndex, widget.id)}
                                            key={widget.id} 
                                            widget={widget}/>;
                                    })}
                                    {this.props.editLayout && <NewWidget onAddWidget={this.onAddWidget} widgetIndex="1"/>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card-deck">
                                    {this.props.widgets2.map( widget => { 
                                        return <TemplateWidget 
                                            deleteWidget={() => this.onDeleteWidget(widget.widgetIndex, widget.id)}
                                            updateTitle={(e) => this.onUpdateWidgetTitle(e, widget.widgetIndex, widget.id)}
                                            updateWidth={(e) => this.onUpdateWidgetWidth(e, widget.widgetIndex, widget.id)}
                                            updateHeight={(e) => this.onUpdateWidgetHeight(e, widget.widgetIndex, widget.id)}
                                            updateType={(e) => this.onUpdateWidgetType(e, widget.widgetIndex, widget.id)}
                                            setFullScreen = {(e) => this.onSetFullScreen(e, widget.widgetIndex, widget.id, !widget.fullScreen)}
                                            updateSetting = {(e) => this.onUpdateSetting(e, widget.widgetIndex, widget.id, !widget.editMode)}
                                            dragColumn = {e => this.onDragColumn(e, widget.widgetIndex, widget.id)}
                                            dropColumn = {e => this.onDropColumn(e)}
                                            allowDropColumn = {e => this.onAllowDropColumn(e)}
                                            changeDS = {e => this.onChangeDS(e, widget.widgetIndex, widget.id)}
                                            changePageIndex = {e => this.onChangePageIndex(e, widget.widgetIndex, widget.id)}
                                            key={widget.id} 
                                            widget={widget}/>;
                                    })}
                                    {this.props.editLayout && <NewWidget onAddWidget={this.onAddWidget} widgetIndex="2"/>}
                                </div>
                            </div>
                        </div>
                    }
                    {this.props.activeLayout === DashboardLayout.DASHBOARD_TWO_COLUMN_RIGHT &&
                        <div className="row">
                            <div className="col-4">col4</div>
                            <div className="col-8">col8</div>
                        </div>
                    }
                    {this.props.activeLayout === DashboardLayout.DASHBOARD_TWO_COLUMN_LEFT &&
                        <div className="row">
                            <div className="col-8">col8</div>
                            <div className="col-4">col4</div>
                        </div>
                    }
                    {this.props.activeLayout === DashboardLayout.DASHBOARD_THREE_COLUMN &&
                        <div className="row">
                            <div className="col-4">
                                <div className="card-deck">
                                    {this.props.widgets1.map( widget => { 
                                        return <TemplateWidget 
                                            deleteWidget={() => this.onDeleteWidget(widget.widgetIndex, widget.id)}
                                            updateTitle={(e) => this.onUpdateWidgetTitle(e, widget.widgetIndex, widget.id)}
                                            updateWidth={(e) => this.onUpdateWidgetWidth(e, widget.widgetIndex, widget.id)}
                                            updateHeight={(e) => this.onUpdateWidgetHeight(e, widget.widgetIndex, widget.id)}
                                            updateType={(e) => this.onUpdateWidgetType(e, widget.widgetIndex, widget.id)}
                                            setFullScreen = {(e) => this.onSetFullScreen(e, widget.widgetIndex, widget.id, !widget.fullScreen)}
                                            updateSetting = {(e) => this.onUpdateSetting(e, widget.widgetIndex, widget.id, !widget.editMode)}
                                            dragColumn = {e => this.onDragColumn(e, widget.widgetIndex, widget.id)}
                                            dropColumn = {e => this.onDropColumn(e)}
                                            allowDropColumn = {e => this.onAllowDropColumn(e)}
                                            changeDS = {e => this.onChangeDS(e, widget.widgetIndex, widget.id)}
                                            changePageIndex = {e => this.onChangePageIndex(e, widget.widgetIndex, widget.id)}
                                            key={widget.id} 
                                            widget={widget}/>;
                                    })}
                                    {this.props.editLayout && <NewWidget onAddWidget={this.onAddWidget} widgetIndex="1"/>}
                                </div>                            
                            </div>
                            <div className="col-4">
                                <div className="card-deck">
                                    {this.props.widgets2.map( widget => { 
                                        return <TemplateWidget 
                                            deleteWidget={() => this.onDeleteWidget(widget.widgetIndex, widget.id)}
                                            updateTitle={(e) => this.onUpdateWidgetTitle(e, widget.widgetIndex, widget.id)}
                                            updateWidth={(e) => this.onUpdateWidgetWidth(e, widget.widgetIndex, widget.id)}
                                            updateHeight={(e) => this.onUpdateWidgetHeight(e, widget.widgetIndex, widget.id)}
                                            updateType={(e) => this.onUpdateWidgetType(e, widget.widgetIndex, widget.id)}
                                            setFullScreen = {(e) => this.onSetFullScreen(e, widget.widgetIndex, widget.id, !widget.fullScreen)}
                                            updateSetting = {(e) => this.onUpdateSetting(e, widget.widgetIndex, widget.id, !widget.editMode)}
                                            dragColumn = {e => this.onDragColumn(e, widget.widgetIndex, widget.id)}
                                            dropColumn = {e => this.onDropColumn(e)}
                                            allowDropColumn = {e => this.onAllowDropColumn(e)}
                                            changeDS = {e => this.onChangeDS(e, widget.widgetIndex, widget.id)}
                                            changePageIndex = {e => this.onChangePageIndex(e, widget.widgetIndex, widget.id)}
                                            key={widget.id} 
                                            widget={widget}/>;
                                    })}
                                    {this.props.editLayout && <NewWidget onAddWidget={this.onAddWidget} widgetIndex="2"/>}
                                </div>                            
                            </div>
                            <div className="col-4">
                                <div className="card-deck">
                                    {this.props.widgets3.map( widget => { 
                                        return <TemplateWidget 
                                            deleteWidget={() => this.onDeleteWidget(widget.widgetIndex, widget.id)}
                                            updateTitle={(e) => this.onUpdateWidgetTitle(e, widget.widgetIndex, widget.id)}
                                            updateWidth={(e) => this.onUpdateWidgetWidth(e, widget.widgetIndex, widget.id)}
                                            updateHeight={(e) => this.onUpdateWidgetHeight(e, widget.widgetIndex, widget.id)}
                                            updateType={(e) => this.onUpdateWidgetType(e, widget.widgetIndex, widget.id)}
                                            setFullScreen = {(e) => this.onSetFullScreen(e, widget.widgetIndex, widget.id, !widget.fullScreen)}
                                            updateSetting = {(e) => this.onUpdateSetting(e, widget.widgetIndex, widget.id, !widget.editMode)}
                                            dragColumn = {e => this.onDragColumn(e, widget.widgetIndex, widget.id)}
                                            dropColumn = {e => this.onDropColumn(e)}
                                            allowDropColumn = {e => this.onAllowDropColumn(e)}
                                            changeDS = {e => this.onChangeDS(e, widget.widgetIndex, widget.id)}
                                            changePageIndex = {e => this.onChangePageIndex(e, widget.widgetIndex, widget.id)}
                                            key={widget.id} 
                                            widget={widget}/>;
                                    })}
                                    {this.props.editLayout && <NewWidget onAddWidget={this.onAddWidget} widgetIndex="3"/>}
                                </div>                            
                            </div>
                        </div>
                    }
                    {this.props.activeLayout === DashboardLayout.DASHBOARD_THREE_COLUMN_MIDDLE &&
                        <div className="row">
                            <div className="col-3">col3</div>
                            <div className="col-6">col6</div>
                            <div className="col-3">col3</div>
                        </div>
                    }                                       
                </div>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    widgets1: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        widgetIndex: PropTypes.string.isRequired,
        editMode: PropTypes.bool.isRequired,
        fullScreen: PropTypes.bool.isRequired,
        widgetTitle: PropTypes.string.isRequired,
        widgetConfig: PropTypes.object.isRequired
    }).isRequired),
    widgets2: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        editMode: PropTypes.bool.isRequired,
        widgetTitle: PropTypes.string.isRequired,
        widgetConfig: PropTypes.object.isRequired
    }).isRequired),
    widgets3: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        editMode: PropTypes.bool.isRequired,
        widgetTitle: PropTypes.string.isRequired,
        widgetConfig: PropTypes.object.isRequired
    }).isRequired),
    history: PropTypes.object,
    editLayout: PropTypes.bool,
    activeLayout: PropTypes.string
};


// CONFIGURE REACT REDUX
const mapStateToProps = state => {
    return {
        editLayout: state.DashboardReducer.editLayout,
        activeLayout: state.DashboardReducer.activeLayout,
        widgets1: state.DashboardReducer.widgets1,
        widgets2: state.DashboardReducer.widgets2,
        widgets3: state.DashboardReducer.widgets3
    };
};

//const nav = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
const nav = connect(mapStateToProps)(DashboardPage);


// EXPORT COMPONENT

export { nav as DashboardPage };