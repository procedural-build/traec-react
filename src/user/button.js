import React from "react";

export function ActionButton({ text, color, onClickHandler }) {
  return (
    <span
      className={`bg-${color || "primary"} rounded ml-2 pl-1 pr-1`}
      style={{ cursor: "pointer" }}
      onClick={onClickHandler}
    >
      {text}
    </span>
  );
}
