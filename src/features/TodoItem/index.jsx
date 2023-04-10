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
    deleteTodo: PropTypes.func,
};

function TodoItem({ todo, onUpdateStatus, deleteTodo }) {
    const [active, setActive] = useState(false);

    function handleTodoOnclick() {
        setActive(!active);
        onUpdateStatus(todo.id, active ? "uncompleted" : "completed");
    }

    function handleDelete() {
        deleteTodo && deleteTodo(todo.id);
    }

    return (
        <li
            className={`todo-item ${active ? "completed" : "uncompleted"} ${todo.status
                }`}
        >
            <p className="todo-title" onClick={handleTodoOnclick}>{todo.title}</p>
            <div className="icon">
                <i onClick={handleDelete}>
                    <FontAwesomeIcon icon="trash-can" />
                </i>
                {/* <i>
                    <FontAwesomeIcon icon="pen-to-square" />
                </i> */}
            </div>
        </li>
    );
}

export default TodoItem;
