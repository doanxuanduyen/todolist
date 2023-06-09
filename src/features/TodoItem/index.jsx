import React, { useState } from "react";
import "reset-css";
import "./styles.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    onUpdateStatus: PropTypes.func.isRequired,
    onUpdateInput: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func,
};

function TodoItem({ todo, onUpdateStatus, deleteTodo, onUpdateInput }) {
    const [active, setActive] = useState(false);

    function handleTodoOnclick() {
        setActive(!active);
        onUpdateStatus(todo.id, active ? "uncompleted" : "completed");
    }
    function handleDelete() {
        deleteTodo(todo.id);
    }
    function handlePopUp() {
        onUpdateInput(todo.id);
        deleteTodo(todo.id);
    }

    return (
        <li
            className={`todo-item ${active ? "completed" : "uncompleted"} ${todo.status
                }`}
        >
            <p className="todo-title" onClick={handleTodoOnclick}>
                {todo.title}
                <i>
                    <FontAwesomeIcon icon="circle-check" />
                </i>
            </p>
            <div className="icon">
                <i onClick={handlePopUp}>
                    <FontAwesomeIcon icon="pen-to-square" />
                </i>
                <i onClick={handleDelete}>
                    <FontAwesomeIcon icon="trash-can" />
                </i>
            </div>
        </li>
    );
}

export default TodoItem;
