import React, { useState, useRef, useEffect } from "react";

import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit-128.png";
import successIcon from "../assets/success.png"; 

const TaskCard = ({
  title,
  tags,
  handleDelete,
  handleEdit,
  handleSuccess, 
  index,
  setActiveCard,
  status,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(title);
  const textAreaRef = useRef(null);

  useEffect(() => {
    setEditedText(title);
  }, [title]);

  const startEditing = () => {
    setIsEditing(true);
    setTimeout(() => textAreaRef.current.focus(), 0);
  };

  const saveEdit = () => {
    const newText = editedText.trim();
    if (newText !== "") {
      handleEdit(index, newText);
    } else {
      setEditedText(title);
    }
    setIsEditing(false);
  };

  return (
    <article
      className="task_card"
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <div className="task_card_content">
        {isEditing ? (
          <textarea
            ref={textAreaRef}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={saveEdit}
            className="task_textarea"
            spellCheck="false"
          />
        ) : (
          <p className="task_text">{editedText}</p>
        )}

        <div className="task_card_bottom_line">
          <div className="task_card_tags">
            {tags.map((tag, index) => (
              <Tag key={index} tagName={tag} selected />
            ))}
          </div>
          <div className="task_actions">
            {!isEditing && (
              <>
                <div
                  className={`task_success ${status === "done" ? "done" : ""}`}
                  onClick={() => handleSuccess(index)}
                >
                  <img
                    src={successIcon}
                    className="success_icon"
                    alt="Mark as Done"
                  />
                </div>

                <div className="task_edit" onClick={startEditing}>
                  <img src={editIcon} className="edit_icon" alt="Edit" />
                </div>
              </>
            )}
            <div className="task_delete" onClick={() => handleDelete(index)}>
              <img src={deleteIcon} className="delete_icon" alt="Delete" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
