import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "reset-css";
import "./styles.css";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

TodoList.propTypes = {
  todoList: PropTypes.array,
};

TodoList.defaultProps = {
  todoList: [],
};

function TodoList() {
  // List todo
  const [todoList, setTodoList] = useState([
    {
      id: uuidv4(),
      tittle: "write",
      status: "uncompleted",
    },
    {
      id: uuidv4(),
      tittle: "speak",
      status: "completed",
    },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [currentOption, setCurrentOption] = useState("All");
  const inputRef = useRef(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleShowDropdown = () => setShowDropdown((prev) => !prev);
  const handleOnclick = (pushTodoItem) => {
    pushTodoItem.preventDefault();
    const inputValue = inputRef.current.value;
    if (inputValue !== 'string') {
      toast.error('Pls, input string!')
    }
    else {
      const newId = uuidv4();
      const newTodo = { id: newId, tittle: inputValue, status: "uncompleted" };
      setTodoList([...todoList, newTodo]);
      inputRef.current.value = "";
    }
  };
  const rederTodoList = todoList.filter(
    (todo) => filterStatus === "all" || filterStatus === todo.status
  );
  const handleDeleteTodo = (id) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodos);
  };

  function handleSetOptionAll() {
    function handleSetCurrentOption() {
      setCurrentOption("All");
    }
    function handleShowOptionAll() {
      setFilterStatus("all");
    }
    handleSetCurrentOption();
    handleShowOptionAll();
  }

  function handleSetOptionCompleted() {
    function handleSetCurrentOption() {
      setCurrentOption("Completed");
    }
    function handleShowOptionCompleted() {
      setFilterStatus("completed");
    }
    handleSetCurrentOption();
    handleShowOptionCompleted();
  }

  function handleSetOptionUncompleted() {
    function handleSetCurrentOption() {
      setCurrentOption("Uncompleted");
    }
    function handleShowOptionUncompleted() {
      setFilterStatus("uncompleted");
    }
    handleSetCurrentOption();
    handleShowOptionUncompleted();
  }
  function handleUpdateTodoStatus(todoId, newStatus) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, status: newStatus };
        }
        return todo;
      })
    );
  }
  return (
    <div className="container">
      <header id="header">
        <i>
          <FontAwesomeIcon icon="bars" />
        </i>
        <h1 className="tittle">To do list</h1>
      </header>
      <main id="main">
        <form action="">
          <div className="input">
            <input
              type="text"
              id="input"
              ref={inputRef}
              placeholder="Add a new task"
            />
            <button onClick={handleOnclick}>
              <FontAwesomeIcon icon="plus" />
              <ToastContainer />
            </button>
          </div>
          <div className="select">
            <div
              className="select-option-choose"
              value="all"
              onClick={handleShowDropdown}
            >
              {currentOption}
              <i>
                <FontAwesomeIcon icon="chevron-down" />
              </i>
            </div>
            {showDropdown && (
              <div className="option">
                <div
                  className="select-option"
                  value="all"
                  onClick={handleSetOptionAll}
                >
                  All
                </div>
                <div
                  className="select-option"
                  value="completed"
                  onClick={handleSetOptionCompleted}
                >
                  Completed
                </div>
                <div
                  className="select-option"
                  value="uncompleted"
                  onClick={handleSetOptionUncompleted}
                >
                  Uncompleted
                </div>
              </div>
            )}
          </div>
        </form>
        <ul>
          {rederTodoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={handleDeleteTodo}
              onUpdateStatus={handleUpdateTodoStatus}
            ></TodoItem>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default TodoList;