import React from "react";

const SudokuNumPad = ({ onClick }) => (
  <div className="SudokuNumPad">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
      <div
        key={num}
        onClick={() => onClick(num)}
        className="SudokuNumPad__number"
      >
        {num}
      </div>
    ))}
  </div>
);
export default SudokuNumPad;
