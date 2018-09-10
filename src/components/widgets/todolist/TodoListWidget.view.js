// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES
import {VisibilityFilters} from './TodoListWidget.action';


export const AddTodoForm = ({addTodo, widgetIndex, widgetId})  => {
    let input;
    return (
        <div className="row mt-3">
            <form onSubmit={e => {
                e.preventDefault();
                if (input.value.trim() !== '') {
                    addTodo(widgetIndex, widgetId, input.value);
                    input.value = '';
                }                
            }} autoComplete="false">
                <div className="form-group">
                    <input type="text" ref={node => {input = node;}}  placeholder="What needs to be done?" className="form-control widget-fontsize todo-noborder" autoFocus/>
                </div>                    
            </form>
        </div>
    );
};

AddTodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
    widgetIndex: PropTypes.string,
    widgetId: PropTypes.number
};


export const TodoList = ({widgetIndex, widgetId, todos, onToogleTodo, onDeleteTodo}) => {
    return (
        <div className="container-flux">
            {todos.map((todo, key) => 
                <div key={key} className="row todo-border">
                    <div className="col-md-10" onClick={()=> onToogleTodo(widgetIndex, widgetId, todo.id, !todo.completed)}>
                        <input type="radio" value={todo.id} name={todo.id} checked={todo.completed}/> <label className={todo.completed ? 'todo-completed': ''}>{todo.text}</label> 
                    </div>
                    <div className="col-md-2">
                        <i className="fab fa fa-times fa-1x todo-delete" onClick={(e) => onDeleteTodo(e, widgetIndex, widgetId, todo.id, todo.completed)}></i>
                    </div>
                </div>
            )}
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.array,
    widgetIndex: PropTypes.string,
    widgetId: PropTypes.number,
    onToogleTodo: PropTypes.func.isRequired,
    onDeleteTodo: PropTypes.func.isRequired
};

export const FilterLink = ({todos, widgetIndex, widgetId, totalUnCompletedTodo, currentFilter, onSetVisibilityFilter, onClearCompleted}) => {
    return (
        <div className="row">
            <span className="item-text">{totalUnCompletedTodo} items left</span>
            <p>
                <button type="button" onClick={() => onSetVisibilityFilter(widgetIndex, widgetId, VisibilityFilters.SHOW_ALL)} className={VisibilityFilters.SHOW_ALL === currentFilter ? 'btn-todo filter-active': 'btn-todo'}>All</button>
                <button type="button" onClick={() => onSetVisibilityFilter(widgetIndex, widgetId, VisibilityFilters.SHOW_ACTIVE)} className={VisibilityFilters.SHOW_ACTIVE === currentFilter ? 'btn-todo filter-active': 'btn-todo'}>Active</button>
                <button type="button" onClick={() => onSetVisibilityFilter(widgetIndex, widgetId, VisibilityFilters.SHOW_COMPLETED)} className={VisibilityFilters.SHOW_COMPLETED === currentFilter ? 'btn-todo filter-active': 'btn-todo'}>Completed</button>
                <button type="button" onClick={() => onClearCompleted(widgetIndex, widgetId, todos)} className="btn-todo todo-noborder">Clear Completed</button>
            </p>                
        </div>
    );
};

FilterLink.propTypes = {
    currentFilter: PropTypes.string,
    onSetVisibilityFilter: PropTypes.func.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    totalUnCompletedTodo: PropTypes.number,
    widgetIndex: PropTypes.string,
    widgetId: PropTypes.number,
    todos: PropTypes.array
};

export const TodoView = ({todoWidget}) => (   
    <div className={todoWidget.props.widget.editMode ? 'container-flux widget-content' : 'container-flux'}>        
        <AddTodoForm addTodo={todoWidget.onAddTodo} widgetIndex={todoWidget.props.widget.widgetIndex} widgetId={todoWidget.props.widget.id}/>
        <FilterLink 
            widgetIndex={todoWidget.props.widget.widgetIndex} 
            widgetId={todoWidget.props.widget.id} 
            todos={getVisibleTodos(todoWidget.props.widget.todos, todoWidget.props.widget.currentFilter)} 
            totalUnCompletedTodo={todoWidget.props.widget.totalUnCompletedTodo} 
            currentFilter={todoWidget.props.widget.currentFilter} 
            onSetVisibilityFilter={todoWidget.onSetVisibilityFilter} 
            onClearCompleted={todoWidget.onClearCompleted} />
        <TodoList 
            widgetIndex={todoWidget.props.widget.widgetIndex} 
            widgetId={todoWidget.props.widget.id}
            todos={getVisibleTodos(todoWidget.props.widget.todos, todoWidget.props.widget.currentFilter)} 
            onToogleTodo={todoWidget.onToogleTodo} onDeleteTodo={todoWidget.onDeleteTodo} />        
    </div>
    
);

TodoView.propTypes = {
    todoWidget: PropTypes.object
};

const getVisibleTodos = (todos, filter) => {    
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter);
    }
};