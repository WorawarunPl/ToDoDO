import React, { useState, useEffect } from "react";
import "./Tag.css";

const Tag = ({ tagName, selectTag, selected, removeTag }) => {
  // color palatte 
  const colors = [
    "#C1D2E6",
    "#949EC3",
    "#8B7099",
    "#F49595",
    "#F6C094",
    "#FFEBB0",
    "#D3E1A0",
    "#A1C698",
  ];
  const defaultColor = "#f9f9f9";

  const tagStyle = {
    Importent: { backgroundColor: "#C1D2E6" },
    HeighPriority: { backgroundColor: "#949EC3" },
    Mark: { backgroundColor: "#8B7099" },
    Work: { backgroundColor: "#F49595" },
    Event: { backgroundColor: "#F6C094" },
    Homework: { backgroundColor: "#FFEBB0" },
    Habits: { backgroundColor: "#D3E1A0" },
    Housework: { backgroundColor: "#A1C698" },
  };

  const [randomColor, setRandomColor] = useState(defaultColor);

  useEffect(() => {
    //random color
    if (!tagStyle[tagName]) {
      setRandomColor(colors[Math.floor(Math.random() * colors.length)]);
    }
  }, [tagName]);

  const style = selected
    ? tagStyle[tagName] || { backgroundColor: randomColor } 
    : { backgroundColor: defaultColor }; // default color when not choose

  return (
    <div className="tag-container">
      <button
        type="button"
        className="tag"
        style={style}
        onClick={() => selectTag(tagName)} 
      >
        {tagName}
      </button>

      {removeTag && (
        <button
          type="button"
          className="remove-tag"
          onClick={() => removeTag(tagName)} 
        >
          &times; {/* × for delete */}
        </button>
      )}
    </div>
  );
};

export default Tag;
