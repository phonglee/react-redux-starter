import { store } from '../components/state/stores/AppStore';
import {DashboardAction} from '../components/state/reducers/DashboardReducer';
import datasource from '../services/datasource.json';
import {WidgetType} from '../components/state/reducers/WidgetReducer';

export const editLayout = (edit) => {
    store.dispatch({
        type: DashboardAction.SET_EDIT_LAYOUT,
        edit
    });
};

export const setLayout = (activeLayout) => {
    store.dispatch({
        type: DashboardAction.SET_ACTIVE_LAYOUT,
        activeLayout
    });
};

let nextWidget = 0;
export const addWidget = (widgetIndex) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.ADD_WIDGET,
        id: nextWidget++
    });
};

export const deleteWidget = (widgetIndex, widgetId) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.DELETE_WIDGET,
        id: widgetId
    });
};

export const updateTitle = (widgetIndex, widgetId, widgetWidth) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.UPDATE_TITLE_WIDGET,
        id: widgetId,
        widgetTitle: widgetWidth
    });
};

export const updateWidth = (widgetIndex, widgetId, widgetWidth) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.UPDATE_WIDTH_WIDGET,
        id: widgetId,
        widgetWidth: widgetWidth
    });
};

export const updateHeight = (widgetIndex, widgetId, widgetHeight) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.UPDATE_HEIGHT_WIDGET,
        id: widgetId,
        widgetHeight: widgetHeight
    });
};

export const updateType = (widgetIndex, widgetId, widgetType) => {
    let widgetDatasource = [];
    let columns = [];
    let rowPerPage = 5;
    let pagesDisplayed = 3;
    let totalRow = 0;
    if (widgetType === WidgetType.DATATABLE_WIDGET) {
        widgetDatasource = datasource;
        totalRow = widgetDatasource[0].data.length; 
        pagesDisplayed = Math.ceil(totalRow/rowPerPage);
        columns = widgetDatasource[0].columns;
    }
    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.UPDATE_TYPE_WIDGET,
        id: widgetId,
        widgetType: widgetType,
        widgetDatasource: widgetDatasource,
        columns: columns,        
        currentPage: 1,
        rowStart: 0,
        rowEnd: rowPerPage,
        rowPerPage: rowPerPage,
        totalRow: totalRow,
        pagesDisplayed: pagesDisplayed        
    });
};

export const setFullScreen = (widgetIndex, widgetId, fullScreen) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.SET_FULLSCREEN,
        id: widgetId,
        fullScreen: fullScreen
    });
};

export const updateSetting = (widgetIndex, widgetId, editMode) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.UPDATE_SETTING_WIDGET,
        id: widgetId,
        editMode: editMode
    });
};

export const moveColumnDS = (widgetIndex, widgetId, columnId) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.MOVE_COLUMN_DATASOURCE,
        id: widgetId,
        columnId: columnId
    });
};

export const updateDS = (widgetIndex, widgetId, activeDS) => {
    let ds = datasource.find(ds => {return ds.name === activeDS;});
    
    let totalRow = ds.data.length; 
    let rowPerPage = totalRow > 5 ? 5 : totalRow;
    let pagesDisplayed = Math.ceil(totalRow/rowPerPage);

    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.UPDATE_DATASOURCE,
        id: widgetId,
        activeDS: activeDS,
        columns: ds.columns,
        currentPage: 1,
        rowStart: 0,
        rowEnd: rowPerPage,
        rowPerPage: rowPerPage,
        totalRow: totalRow,
        pagesDisplayed: pagesDisplayed
    });
};

export const changePageIndex = (widgetIndex, widgetId, currentPage) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        type: DashboardAction.CHANGE_PAGE_DATASOURCE,
        id: widgetId,
        currentPage: currentPage
    });
};