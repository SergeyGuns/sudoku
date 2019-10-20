import React from "react";

export default function SudokuMatrix({ puzzle }) {
  function splitPuzzleString(puzzle) {
    return puzzle.split(/(.{9})/).filter(_ => _);
  }

  return (
    <table>
      <tbody>
        {splitPuzzleString(puzzle).map((row, i) => {
          return (
            <tr key={i + row}>
              {row.split("").map((col, j) => (
                <td key={j + i * 10 + col}>{col}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
