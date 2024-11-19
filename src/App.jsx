import React, { useState, useEffect } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import TaskCard from "./components/TaskCard";
import todoIcon from "./assets/todo_icon.png";
import doingIcon from "./assets/doing_icon.png";
import doneIcon from "./assets/done_icon.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const handleEdit = (taskIndex, newTitle) => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
  };

   const handleSuccess = (taskIndex) => {
     const updatedTasks = tasks.map((task, index) => {
       if (index === taskIndex) {
         if (task.status === "done") {
          // move to previous state
           return { ...task, status: task.previousStatus || "todo" };
         } else {
           // move to done state
           return { ...task, status: "done", previousStatus: task.status };
         }
       }
       return task;
     });
     setTasks(updatedTasks);
   };



const onDrop = (status, position) => {
  if (activeCard === null || activeCard === undefined) return;

  const taskToMove = tasks[activeCard];
  const updatedTasks = tasks.filter((_, index) => index !== activeCard);

  updatedTasks.splice(position, 0, { ...taskToMove, status });

  setTasks(updatedTasks); 
  setActiveCard(null); 
};


  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />

      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleSuccess={handleSuccess}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleSuccess={handleSuccess}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleSuccess={handleSuccess}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </main>
    </div>
  );
};

export default App;
