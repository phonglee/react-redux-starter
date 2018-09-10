
import { store } from '../../../components/state/stores/AppStore';

export const TodoAction = {
    'ADD_TODO': 'ADD_TODO',
    'SET_VISIBILITY_FILTER': 'SET_VISIBILITY_FILTER',
    'TOGGLE_TODO': 'TOGGLE_TODO',
    'CLEAR_COMPLETED' : 'CLEAR_COMPLETED',
    'DELETE_TODO': 'DELETE_TODO'
};

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

let nextTodoId = 0;
export const addTodo = (widgetIndex, widgetId, text) => {
    let todo = {
        id: nextTodoId++,
        text: text,
        completed: false
    };
    store.dispatch({
        widgetIndex: widgetIndex,
        id: widgetId,
        todo: todo,
        type: TodoAction.ADD_TODO
    });
};

export const setVisibilityFilter = (widgetIndex, widgetId, filter) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        id: widgetId,
        filter: filter,
        type: TodoAction.SET_VISIBILITY_FILTER
    });
};

export const toogleTodo = (widgetIndex, widgetId, todoId, completed) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        id: widgetId,
        todoId: todoId,
        completed: completed,
        type: TodoAction.TOGGLE_TODO
    });
};

export const clearCompleted = (widgetIndex, widgetId, todos) => {
    let todoNew = todos.filter((todo) => todo.completed === false);
    store.dispatch({
        widgetIndex: widgetIndex,
        id: widgetId,
        todos: todoNew,
        totalUnCompletedTodo: todoNew.length,
        type: TodoAction.CLEAR_COMPLETED
    });
};


export const deleteTodo = (widgetIndex, widgetId, todoId, completed) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        id: widgetId,
        todoId: todoId,
        completed: completed,
        type: TodoAction.DELETE_TODO
    });
};