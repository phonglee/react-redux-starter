import {WidgetType} from '../reducers/WidgetReducer';

export const DashboardAction = {
    'SET_EDIT_LAYOUT': 'SET_EDIT_LAYOUT',
    'SET_ACTIVE_LAYOUT': 'SET_ACTIVE_LAYOUT',
    'ADD_WIDGET': 'ADD_WIDGET',
    'DELETE_WIDGET': 'DELETE_WIDGET',
    'SET_ADD_WIDGET': 'SET_ADD_WIDGET',
    'SET_FULLSCREEN': 'SET_FULLSCREEN',
    'UPDATE_SETTING_WIDGET': 'UPDATE_SETTING_WIDGET',
    'UPDATE_TITLE_WIDGET': 'UPDATE_TITLE_WIDGET',
    'UPDATE_TYPE_WIDGET': 'UPDATE_TYPE_WIDGET',
    'UPDATE_WIDTH_WIDGET': 'UPDATE_WIDTH_WIDGET',
    'UPDATE_HEIGHT_WIDGET': 'UPDATE_HEIGHT_WIDGET',
    'MOVE_COLUMN_DATASOURCE': 'MOVE_COLUMN_DATASOURCE',
    'UPDATE_DATASOURCE': 'UPDATE_DATASOURCE',
    'CHANGE_PAGE_DATASOURCE': 'CHANGE_PAGE_DATASOURCE'
};

export const DashboardLayout = {
    DASHBOARD_ONE_COLUMN: 'DASHBOARD_ONE_COLUMN',
    DASHBOARD_TWO_COLUMN: 'DASHBOARD_TWO_COLUMN',
    DASHBOARD_TWO_COLUMN_RIGHT: 'DASHBOARD_TWO_COLUMN_RIGHT',
    DASHBOARD_TWO_COLUMN_LEFT: 'DASHBOARD_TWO_COLUMN_LEFT',
    DASHBOARD_THREE_COLUMN: 'DASHBOARD_THREE_COLUMN',
    DASHBOARD_THREE_COLUMN_MIDDLE: 'DASHBOARD_THREE_COLUMN_MIDDLE'
};

export const WIDGET_DEFAULT = {
    WIDGET_TITLE: 'Widget Setting',
    WIDGET_TYPE: WidgetType.TEXT_WIDGET,
    WIDGET_FULLSCREEN: false,
    WIDGET_EDIT: true,
    WIDGET_WIDTH: 400,
    WIDGET_HEIGHT: 300
};

const initialState = {
    editLayout: false,
    fullScreen: false,
    activeLayout: DashboardLayout.DASHBOARD_ONE_COLUMN,
    addWidget: false,
    widgets1: [],
    widgets2: [],
    widgets3: []
};

export const DashboardReducer = (state = initialState, action) => {
    switch(action.type) {
        case DashboardAction.SET_EDIT_LAYOUT:
            return Object.assign({}, state, {
                editLayout: action.edit,
                widgets1: state.widgets1.map((widget) => 
                    widget.id !== -1 ? 
                        {...widget, 
                            editMode: false
                        }
                        : widget),
                widgets2: state.widgets2.map((widget) => 
                    widget.id !== -1 ? 
                        {...widget, 
                            editMode: false
                        }
                        : widget),
                widgets3: state.widgets3.map((widget) => 
                    widget.id !== -1 ? 
                        {...widget, 
                            editMode: false
                        }
                        : widget)
            });
        case DashboardAction.SET_ACTIVE_LAYOUT:
            return Object.assign({}, state, {
                activeLayout: action.activeLayout
            });
        case DashboardAction.ADD_WIDGET: {
            let widget = {
                id: action.id,
                widgetIndex: action.widgetIndex,
                editMode: WIDGET_DEFAULT.WIDGET_EDIT,
                fullScreen: WIDGET_DEFAULT.WIDGET_FULLSCREEN,
                widgetType: WIDGET_DEFAULT.WIDGET_TYPE,
                widgetTitle: WIDGET_DEFAULT.WIDGET_TITLE,
                widgetConfig: {
                    width: WIDGET_DEFAULT.WIDGET_WIDTH,
                    height: WIDGET_DEFAULT.WIDGET_HEIGHT
                },
                widgetDatasource: [],
                columns: [],
                selectedColumns: [],
                activeDS: ''
            };
            switch(action.widgetIndex) {
                case '1':
                    return Object.assign({}, state, {
                        widgets1: [...state.widgets1, widget]
                    });
                case '2':
                    return Object.assign({}, state, {
                        widgets2: [...state.widgets2,widget]
                    });
                default:
                    return Object.assign({}, state, {
                        widgets3: [...state.widgets3,widget]
                    });
            }
        }            
        case DashboardAction.DELETE_WIDGET:
            switch(action.widgetIndex) {
                case '1':
                    return Object.assign({}, state, {
                        widgets1: state.widgets1.filter(widget => widget.id !== action.id)
                    });
                case '2':
                    return Object.assign({}, state, {
                        widgets2: state.widgets2.filter(widget => widget.id !== action.id)
                    });
                default:
                    return Object.assign({}, state, {
                        widgets3: state.widgets3.filter(widget => widget.id !== action.id)
                    });
            }
        case DashboardAction.UPDATE_WIDTH_WIDGET:
            switch(action.widgetIndex) {
                case '1': {
                    return Object.assign({}, state, {
                        widgets1: state.widgets1.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    widgetConfig: {
                                        width: action.widgetWidth !== '' ? parseInt(action.widgetWidth) : WIDGET_DEFAULT.WIDGET_WIDTH,
                                        height: widget.widgetConfig.height
                                    }
                                }
                                : widget)
                    });
                }
                case '2': {
                    return Object.assign({}, state, {
                        widgets2: state.widgets2.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    widgetConfig: {
                                        width: action.widgetWidth !== '' ? parseInt(action.widgetWidth) : WIDGET_DEFAULT.WIDGET_WIDTH,
                                        height: widget.widgetConfig.height
                                    }
                                }
                                : widget)
                    });
                }                    
                default: {
                    return Object.assign({}, state, {
                        widgets3: state.widgets3.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    widgetConfig: {
                                        width: action.widgetWidth !== '' ? parseInt(action.widgetWidth) : WIDGET_DEFAULT.WIDGET_WIDTH,
                                        height: widget.widgetConfig.height
                                    }
                                }
                                : widget)
                    });
                }
            }
        case DashboardAction.UPDATE_HEIGHT_WIDGET:
            switch(action.widgetIndex) {
                case '1': {
                    return Object.assign({}, state, {
                        widgets1: state.widgets1.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    widgetConfig: {
                                        height: action.widgetHeight !== '' ? parseInt(action.widgetHeight) : WIDGET_DEFAULT.WIDGET_HEIGHT,
                                        width: widget.widgetConfig.width
                                    }
                                }
                                : widget)
                    });
                }
                case '2': {
                    return Object.assign({}, state, {
                        widgets2: state.widgets2.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    widgetConfig: {
                                        height: action.widgetHeight !== '' ? parseInt(action.widgetHeight) : WIDGET_DEFAULT.WIDGET_HEIGHT,
                                        width: widget.widgetConfig.width
                                    }
                                }
                                : widget)
                    });
                }                    
                default: {
                    return Object.assign({}, state, {
                        widgets3: state.widgets.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    widgetConfig: {
                                        height: action.widgetHeight !== '' ? parseInt(action.widgetHeight) : WIDGET_DEFAULT.WIDGET_HEIGHT,
                                        width: widget.widgetConfig.width
                                    }
                                }
                                : widget)
                    });
                }
            }            
        case DashboardAction.UPDATE_TITLE_WIDGET:
            switch(action.widgetIndex) {
                case '1': {
                    return Object.assign({}, state, {
                        widgets1: state.widgets1.map((widget) => widget.id === action.id ? {...widget, widgetTitle: action.widgetTitle !== '' ? action.widgetTitle : WIDGET_DEFAULT.WIDGET_TITLE}: widget)
                    });
                }
                case '2': {
                    return Object.assign({}, state, {
                        widgets2: state.widgets2.map((widget) => widget.id === action.id ? {...widget, widgetTitle: action.widgetTitle !== '' ? action.widgetTitle : WIDGET_DEFAULT.WIDGET_TITLE}: widget)
                    });
                }                    
                default: {
                    return Object.assign({}, state, {
                        widgets3: state.widgets3.map((widget) => widget.id === action.id ? {...widget, widgetTitle: action.widgetTitle !== '' ? action.widgetTitle : WIDGET_DEFAULT.WIDGET_TITLE}: widget)
                    });
                }
            }
        case DashboardAction.UPDATE_TYPE_WIDGET:
            switch(action.widgetIndex) {
                case '1': {
                    return Object.assign({}, state, {
                        widgets1: state.widgets1.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    widgetType: action.widgetType,
                                    widgetDatasource: widget.widgetDatasource.length > 0 ? widget.widgetDatasource : action.widgetDatasource,
                                    columns: action.columns,
                                    activeDS: action.widgetDatasource.length > 0 ? action.widgetDatasource[0].name : widget.activeDS,
                                    currentPage: action.currentPage,
                                    rowStart: action.rowStart,
                                    rowEnd: action.rowEnd,
                                    rowPerPage: action.rowPerPage,
                                    totalRow: action.totalRow,
                                    pagesDisplayed: action.pagesDisplayed
                                }
                                : widget)
                    });
                }
                case '2': {
                    return Object.assign({}, state, {
                        widgets2: state.widgets2.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    widgetType: action.widgetType,
                                    widgetDatasource: widget.widgetDatasource.length > 0 ? widget.widgetDatasource : action.widgetDatasource,
                                    columns: action.columns
                                }
                                : widget)
                    });
                }                    
                default: {
                    return Object.assign({}, state, {
                        widgets3: state.widgets3.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    widgetType: action.widgetType,
                                    widgetDatasource: widget.widgetDatasource.length > 0 ? widget.widgetDatasource : action.widgetDatasource,
                                    columns: action.columns
                                }
                                : widget)
                    });
                }
            }
        case DashboardAction.SET_FULLSCREEN:
            switch(action.widgetIndex) {
                case '1': {
                    return Object.assign({}, state, {
                        widgets1: state.widgets1.map((widget) => widget.id === action.id ? {...widget, fullScreen: action.fullScreen}: widget)
                    });
                }
                case '2': {
                    return Object.assign({}, state, {
                        widgets2: state.widgets2.map((widget) => widget.id === action.id ? {...widget, fullScreen: action.fullScreen}: widget)
                    });
                }                    
                default: {
                    return Object.assign({}, state, {
                        widgets3: state.widgets3.map((widget) => widget.id === action.id ? {...widget, fullScreen: action.fullScreen}: widget)
                    });
                }
            }
        case DashboardAction.UPDATE_SETTING_WIDGET:
            switch(action.widgetIndex) {
                case '1': {
                    return Object.assign({}, state, {
                        widgets1: state.widgets1.map((widget) => widget.id === action.id ? {...widget, editMode: action.editMode} : widget)
                    });
                }
                case '2': {
                    return Object.assign({}, state, {
                        widgets2: state.widgets2.map((widget) => widget.id === action.id ? {...widget, editMode: action.editMode}: widget)
                    });
                }                    
                default: {
                    return Object.assign({}, state, {
                        widgets3: state.widgets3.map((widget) => widget.id === action.id ? {...widget, editMode: action.editMode}: widget)
                    });
                }
            }
        case DashboardAction.MOVE_COLUMN_DATASOURCE:
            switch(action.widgetIndex) {
                case '1': {
                    let widgetUpdate = state.widgets1.find(widget => {return widget.id === action.id;});
                    let column = widgetUpdate.columns.find(column => {return column.id === action.columnId;});
                    let updateSelected = true;
                    if (!column) {
                        updateSelected = false;
                        column = widgetUpdate.selectedColumns.find(column => {return column.id === action.columnId;});
                    }
                    return Object.assign({}, state, {
                        widgets1: state.widgets1.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    selectedColumns: updateSelected ? [...widget.selectedColumns, column] : widget.selectedColumns.filter(column => column.id !== action.columnId),
                                    columns: updateSelected ? widget.columns.filter(column => column.id !== action.columnId) : [...widget.columns, column]
                                }
                                : widget)
                    });
                }
                case '2': {
                    let widgetUpdate = state.widgets2.find(widget => {return widget.id === action.id;});
                    let column = widgetUpdate.columns.find(column => {return column.id === action.columnId;});
                    let updateSelected = true;
                    if (!column) {
                        updateSelected = false;
                        column = widgetUpdate.selectedColumns.find(column => {return column.id === action.columnId;});
                    }
                    return Object.assign({}, state, {
                        widgets2: state.widgets2.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    selectedColumns: updateSelected ? [...widget.selectedColumns, column] : widget.selectedColumns.filter(column => column.id !== action.columnId),
                                    columns: updateSelected ? widget.columns.filter(column => column.id !== action.columnId) : [...widget.columns, column]
                                }
                                : widget)
                    });
                }                    
                case '3': {
                    let widgetUpdate = state.widgets3.find(widget => {return widget.id === action.id;});
                    let column = widgetUpdate.columns.find(column => {return column.id === action.columnId;});
                    let updateSelected = true;
                    if (!column) {
                        updateSelected = false;
                        column = widgetUpdate.selectedColumns.find(column => {return column.id === action.columnId;});
                    }
                    return Object.assign({}, state, {
                        widgets3: state.widgets3.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    selectedColumns: updateSelected ? [...widget.selectedColumns, column] : widget.selectedColumns.filter(column => column.id !== action.columnId),
                                    columns: updateSelected ? widget.columns.filter(column => column.id !== action.columnId) : [...widget.columns, column]
                                }
                                : widget)
                    });
                }
                default: return state;
            }
        case DashboardAction.UPDATE_DATASOURCE:
            switch(action.widgetIndex) {
                case '1': {
                    return Object.assign({}, state, {
                        widgets1: state.widgets1.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    activeDS: action.activeDS,
                                    columns: action.columns,
                                    selectedColumns: [],
                                    currentPage: action.currentPage,
                                    rowStart: action.rowStart,
                                    rowEnd: action.rowEnd,
                                    rowPerPage: action.rowPerPage,
                                    totalRow: action.totalRow,
                                    pagesDisplayed: action.pagesDisplayed
                                }
                                : widget)
                    });
                }
                case '2': {
                    return Object.assign({}, state, {
                        widgets2: state.widgets2.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    activeDS: action.activeDS,
                                    columns: action.columns,
                                    selectedColumns: [],
                                    currentPage: action.currentPage,
                                    rowStart: action.rowStart,
                                    rowEnd: action.rowEnd,
                                    rowPerPage: action.rowPerPage,
                                    totalRow: action.totalRow,
                                    pagesDisplayed: action.pagesDisplayed
                                }
                                : widget)
                    });
                }                    
                default: {
                    return Object.assign({}, state, {
                        widgets3: state.widgets3.map((widget) => 
                            widget.id === action.id ? 
                                {...widget, 
                                    activeDS: action.activeDS,
                                    columns: action.columns,
                                    selectedColumns: [],
                                    currentPage: action.currentPage,
                                    rowStart: action.rowStart,
                                    rowEnd: action.rowEnd,
                                    rowPerPage: action.rowPerPage,
                                    totalRow: action.totalRow,
                                    pagesDisplayed: action.pagesDisplayed
                                }
                                : widget)
                    });
                }
            }            
        case DashboardAction.SET_ADD_WIDGET:
            return Object.assign({}, state, {
                addWidget: action.addWidget
            });
        case DashboardAction.CHANGE_PAGE_DATASOURCE:
            switch(action.widgetIndex) {
                case '1': {
                    return Object.assign({}, state, {
                        widgets1: state.widgets1.map((widget) => 
                            widget.id === action.id && widget.currentPage != action.currentPage ? 
                                {...widget, 
                                    currentPage: action.currentPage,
                                    rowStart: parseInt(action.currentPage - 1) * widget.rowPerPage,
                                    rowEnd: parseInt(action.currentPage * widget.rowPerPage)
                                }
                                : widget)
                    });
                }
                case '2': {
                    return Object.assign({}, state, {
                        widgets2: state.widgets2.map((widget) => 
                            widget.id === action.id && widget.currentPage != action.currentPage ? 
                                {...widget, 
                                    currentPage: action.currentPage,
                                    rowStart: parseInt(action.currentPage - 1) * widget.rowPerPage,
                                    rowEnd: parseInt(action.currentPage * widget.rowPerPage)
                                }
                                : widget)
                    });
                }                    
                default: {
                    return Object.assign({}, state, {
                        widgets3: state.widgets3.map((widget) => 
                            widget.id === action.id && widget.currentPage != action.currentPage ? 
                                {...widget, 
                                    currentPage: action.currentPage,
                                    rowStart: parseInt(action.currentPage - 1) * widget.rowPerPage,
                                    rowEnd: parseInt(action.currentPage * widget.rowPerPage)
                                }
                                : widget)
                    });
                }
            }            
        default:
            return state;
    }
};