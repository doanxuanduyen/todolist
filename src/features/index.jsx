import React, { useState, useRef, useEffect } from "react";
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

function TodoList() {
  const [todoList, setTodoList] = useState([
    {
      id: uuidv4(),
      title: "Đi mua thịt lúc 4h30",
      status: "completed",
    },
    {
      id: uuidv4(),
      title: "Đọc sách lúc 2h chiều",
      status: "uncompleted",
    },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentOption, setCurrentOption] = useState("All");
  const [filterStatus, setFilterStatus] = useState("all");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleShowDropdown = () => setShowDropdown((prev) => !prev);
  const handleOnclick = (pushTodoItem) => {
    pushTodoItem.preventDefault();
    const inputValue = inputRef.current.value.trim();
    if (inputValue === "" ) {
      toast.error('Pls, input string!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "#161d30",
      })
      inputRef.current.value = "";
    }
    else {
      const newId = uuidv4();
      const newTodo = { id: newId, title: inputValue, status: "uncompleted" };
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
  function handleUpdateTodoInput(todoId, newTitle, status) {
    todoList.forEach((todo) => {
      if (todo.id === todoId) {
        inputRef.current.value = todo.title;
        todo.title = newTitle;
        todo.status = status;
      }
    })
    setTodoList([...todoList]); 
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="container">
      {/* HEADER */}
      <header id="header">
        <i>
          <FontAwesomeIcon icon="bars" />
        </i>
        <h1 className="title">To do list</h1>
      </header>
      {/* MAIN */}
      <main id="main">
        {/* Input - select */}
        <form action="">
          <div className="input">
            <input
              type="text"
              id="input"
              ref={inputRef}
              placeholder="Add a new task"
            />
            <button className="btn" onClick={handleOnclick}>
              <FontAwesomeIcon icon="plus" />
            </button>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="#161d30" />
          </div>
          <div className="select" ref={dropdownRef} onClick={handleShowDropdown}>
            <div
              className="select-option-choose"
              value="all"
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
        {/* Todo items */}
        <ul>
          {rederTodoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={handleDeleteTodo}
              onUpdateStatus={handleUpdateTodoStatus}
              onUpdateInput={handleUpdateTodoInput}
            ></TodoItem>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default TodoList;