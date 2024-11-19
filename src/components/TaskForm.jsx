import React, { useState, useEffect } from "react";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  const [newTag, setNewTag] = useState("");
  const [customTags, setCustomTags] = useState([]);

  useEffect(() => {
    const savedTags = localStorage.getItem("customTags");
    if (savedTags) {
      try {
        const parsedTags = JSON.parse(savedTags);
        setCustomTags(parsedTags);
        console.log("Loaded customTags from localStorage:", parsedTags);
      } catch (error) {
        console.error("Error parsing customTags from localStorage:", error);
        setCustomTags([]);
      }
    }
  }, []);

  useEffect(() => {
    if (customTags.length > 0) {
      localStorage.setItem("customTags", JSON.stringify(customTags));
      console.log("Updated customTags saved to localStorage:", customTags);
    }
  }, [customTags]);

  const checkTag = (tagName) => taskData.tags.includes(tagName);

  const selectTag = (tagName) => {
    setTaskData((prev) => {
      if (prev.tags.includes(tagName)) {
        return { ...prev, tags: prev.tags.filter((tag) => tag !== tagName) };
      } else {
        return { ...prev, tags: [...prev.tags, tagName] };
      }
    });
  };

  const removeTag = (tagName) => {
    const updatedTags = customTags.filter((tag) => tag !== tagName);
    setCustomTags(updatedTags); 
    console.log("Tag removed and localStorage updated:", updatedTags);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault();
      const tagExists =
        customTags.includes(newTag) ||
        [
          "Importent",
          "HeighPriority",
          "Mark",
          "Work",
          "Event",
          "Homework",
          "Habits",
          "Housework",
        ].includes(newTag);

      if (!tagExists) {
        const updatedTags = [...customTags, newTag];
        setCustomTags(updatedTags); 
        setNewTag(""); 
        console.log("New tag added:", newTag, "Updated tags:", updatedTags);
      } else {
        alert("This tag already exists or is reserved!");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.task.trim() === "") {
      alert("Please fill in your task");
      return;
    }
    setTasks((prev) => [...prev, taskData]);
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  };

  return (
    <header
      className="app_header"
      style={{
        backgroundImage: "url('src/assets/header.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Enter your task today"
          onChange={handleChange}
        />

        <div className="task_form_bottom_line">
          <div className="tag-cont">
            {[
              "Importent",
              "HeighPriority",
              "Mark",
              "Work",
              "Event",
              "Homework",
              "Habits",
              "Housework",
            ].map((tag) => (
              <Tag
                key={tag}
                tagName={tag}
                selectTag={selectTag}
                selected={checkTag(tag)}
                removeTag={removeTag}
              />
            ))}
            {customTags.map((tag) => (
              <Tag
                key={tag}
                tagName={tag}
                selectTag={selectTag}
                selected={checkTag(tag)}
                removeTag={removeTag}
              />
            ))}
          </div>

          <div className="task-controls">
            <input
              type="text"
              value={newTag}
              className="add_tag"
              placeholder=" + add your tag"
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
            </select>
            <button type="submit" className="task_submit">
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
