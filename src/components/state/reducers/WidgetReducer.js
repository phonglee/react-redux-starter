const initialState = {
    error: false,
    logged: false
};

export const WidgetType = {
    'CHOOSE': 'Choose...',
    'TEXT_WIDGET': 'Text',
    'DATATABLE_WIDGET': 'Datatable',
    'ORGCHART_WIDGET': 'Org Chart',
    'TODOLIST_WIDGET': 'Todo List',
    'SIMPLECHART_WIDGET': 'Simple Chart',
    'STOCKSTICKER_WIDGET': 'Stock Sticker'
};

export const WidgetOption = [
    {
        id: 0,
        name: 'Choose...'
    },
    {
        id: 1,
        name: 'Text'
    },
    {
        id: 2,
        name: 'Datatable'
    },
    {
        id: 3,
        name: 'Org Chart'
    },
    {
        id: 4,
        name: 'Todo List'
    },
    {
        id: 5,
        name: 'Simple Chart'
    },
    {    id: 6,
        name: 'Stock Sticker'
    }
];


export const WidgetAction = {    
    'FETCH_DATASOURCE': 'FETCH_DATASOURCE'
};

export const WidgetReducer = (state = initialState, action) => {
    switch(action.type) {
        case WidgetAction.FETCH_DATASOURCE:
            return Object.assign({}, state, {
                error: false,
                logged: action.logged
            });
        default:
            return state;
    }
};