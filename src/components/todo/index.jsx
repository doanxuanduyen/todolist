import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareMinus,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

function Todo() {
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [options, setOptions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loadingTaskId, setLoadingTaskId] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const newOptions = response.data.map((user) => ({
          value: user.id.toString(),
          label: user.name,
        }));
        setOptions(newOptions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedValue) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/users/${selectedValue}/todos`
        )
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching tasks data:", error);
        });
    } else {
      setTasks([]);
    }
  }, [selectedValue]);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleMarkDone = (taskId) => {
    setLoadingTaskId(taskId);
    axios
      .patch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        completed: true,
      })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        );
        setTasks(updatedTasks);
        setLoadingTaskId(null);
      })
      .catch((error) => {
        console.error("Error marking task as done:", error);
        setLoadingTaskId(null);
      });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  const countCompletedTasks = () => {
    if (!selectedValue) return 0;
    return tasks.filter((task) => task.completed).length;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-semibold pr-4">User</h1>
          <hr className="w-full h-1 border-t border-solid border-line" />
        </div>
        <div className="mt-2">
          <Select
            showSearch
            style={{ width: 200, height: 32 }}
            placeholder="Select user"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.localeCompare(optionB.children)
            }
            value={selectedValue}
            onChange={handleSelectChange}
          >
            {options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div> 
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-[500] pr-4">Tasks</h1>
          <hr className="w-full h-1 border-t border-solid border-line" />
        </div>
        <ul className="mt-8 border border-solid border-line h-[500px] rounded-lg overflow-y-auto">
          {sortedTasks.map((task) => (
            <li
              className="py-4 px-8 border border-bottom border-line-light flex justify-between items-center"
              key={task.id}
            >
              <div className="">
                <FontAwesomeIcon
                  icon={task.completed ? faCheckCircle : faSquareMinus}
                  className={`mr-2 ${
                    task.completed ? "text-green-500" : "text-yellow-500"
                  }`}
                />
                <span>{task.title}</span>
              </div>
              {!task.completed && (
                <button
                  onClick={() => handleMarkDone(task.id)}
                  disabled={loadingTaskId === task.id}
                  className="p-2 border border-solid "
                >
                  {loadingTaskId === task.id ? "Loading..." : "Mark Done"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <span>
        {selectedValue && `Done ${countCompletedTasks()}/${tasks.length} tasks`}
      </span>
    </div>
  );
}

export default Todo;
