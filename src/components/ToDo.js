import React, { useState, useRef } from "react";

const TodoApp = () => {
  //task input fields
  const [task, setTask] = useState("");
  const inputHandler = (e) => {
    setTask(e.target.value);
  };
  //storing data of todos
  const [todos, setToDos] = useState([]);

  // State to track index of task being edited
  const [editIndex, setEditIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      // If task is empty or only contains whitespace characters, do nothing
      return;
    }
    if (editIndex !== null) {
      // If editIndex isn't null, it means we're editing an existing task
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = task;
      setToDos(updatedTodos);
      setEditIndex(null); // Reset editIndex after editing
    } else {
      const newTasks = [...todos, task];
      setToDos(newTasks);
    }
    setTask("");
  };
  //delete feature
  const deleteToDo = (index) => {
    const filteredTasks = todos.filter((_, i) => i !== index);
    setToDos(filteredTasks);
  };
  //edit feature
  const editToDo = (index) => {
    // Set editIndex to the index of the task being edited
    setEditIndex(index);
    // Set the task in the input field to the task being edited
    setTask(todos[index]);
    inputRef.current.focus(); // Focus the input field
  };
  const inputRef = useRef(null); // Create a ref for the input field

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-y-4 px-10">
        <p className="text-2xl font-medium">to_do</p>
        <form
          className="flex flex-row gap-x-2 gap-y-0"
          onSubmit={submitHandler}
        >
          <input
            ref={inputRef} // Assign the ref to the input field
            className="border-[2px] border-black rounded-md px-4 py-2"
            type="text"
            name="yourText"
            // Conditionally setting placeholder based on whether we're editing or adding a new task
            placeholder={editIndex !== null ? "Edit Task" : "typeYourTask"}
            value={task}
            onChange={inputHandler}
          />
          <button
            className="bg-[#006098] text-[#fff] rounded-md text-base py-1 px-2"
            type="submit"
          >
            {/* Change button text based on whether we're editing or adding a new task */}
            {editIndex !== null ? "Update Task" : "New Task"}
          </button>
        </form>
        <div className="flex flex-col gap-y-4">
          {todos.map((todo, index) => (
            <div
              className="grid grid-cols-3 justify-center items-center gap-x-4 gap-y-2"
              key={index}
            >
              <p className="inputButton flex flex-wrap text-balance">{todo}</p>
              <button
                className="border-[2px] px-4 py-1 rounded-md"
                onClick={() => editToDo(index)}
                // onFocus={''}
              >
                edit
              </button>
              <button
                className="border-[2px] px-4 py-1 rounded-md"
                onClick={() => deleteToDo(index)}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoApp;
