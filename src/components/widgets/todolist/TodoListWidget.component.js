// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES
import {TodoView} from './TodoListWidget.view';
import {addTodo, setVisibilityFilter, toogleTodo, clearCompleted, deleteTodo} from './TodoListWidget.action';

export class TodoListWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todo: ''
        };
        this.onAddTodo = this.onAddTodo.bind(this);
        this.onToogleTodo = this.onToogleTodo.bind(this);
        this.onDeleteTodo = this.onDeleteTodo.bind(this);
        this.onSetVisibilityFilter = this.onSetVisibilityFilter.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
    }

    onAddTodo (widgetIndex, widgetId, text) {
        addTodo(widgetIndex, widgetId, text);        
    }

    onToogleTodo(widgetIndex, widgetId, todoId, completed) {
        toogleTodo(widgetIndex, widgetId, todoId, completed);
    }

    onDeleteTodo(e, widgetIndex, widgetId, todoId, completed) {
        e.preventDefault();
        deleteTodo(widgetIndex, widgetId, todoId, completed);
    }

    onSetVisibilityFilter(widgetIndex, widgetId, filter) {
        setVisibilityFilter(widgetIndex, widgetId, filter);
    }

    onClearCompleted(widgetIndex, widgetId, todos) {
        clearCompleted(widgetIndex, widgetId, todos);
    }

    render() {
        return <TodoView todoWidget={this}/>;
    }
}


// const mapStateToProps = state => {
//     return {
//         todos: getVisibleTodos(state.TodoListReducer.todos, state.TodoListReducer.visibilityFilter),
//         visibilityFilter: state.TodoListReducer.visibilityFilter
//     };
// };

// const hoc = connect(mapStateToProps)(TodoListWidgetNew);


// // EXPORT COMPONENT
// export { hoc as TodoListWidgetNew };
