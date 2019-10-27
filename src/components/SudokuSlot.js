import React from "react";

const SudokuSlot = ({ num, active, onClick, selected }) => {
  return (
    <div
      onClick={onClick}
      className={
        "SudokuSlot" +
        (active ? " SudokuSlot--active" : "") +
        (selected ? " SudokuSlot--selected" : "")
      }
    >
      {num}
    </div>
  );
};
export default SudokuSlot;
