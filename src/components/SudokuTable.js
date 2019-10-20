import React from "react";
import SudokuGenerator from "../utils/sudoku.generator";
import SudokuMatrix from "./SudokuMatrix";
const generator = SudokuGenerator();

export default class SudokuTable extends React.Component {
  constructor(props) {
    super();
    SudokuGenerator(this);
    this.state = {
      difficulty: 17, // `difficulty` must be a number between 17 and 81
      puzzle: "",
      initPuzzle: ""
    };
  }

  componentDidMount() {
    const puzzle = generator.generate(this.state.difficulty);
    this.setState({ puzzle, initPuzzle: puzzle });
  }

  render() {
    const { puzzle } = this.state;
    return (
      <div>
        <SudokuMatrix puzzle={puzzle} />
      </div>
    );
  }
}
