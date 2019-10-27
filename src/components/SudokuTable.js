import React from "react";
import SudokuGenerator from "../utils/sudoku.generator";
import SudokuSlot from "./SudokuSlot";
import SudokuNumPad from "./SudokuNumPad";
const generator = SudokuGenerator();

export default class SudokuTable extends React.Component {
  constructor(props) {
    super();
    SudokuGenerator(this);
    this.state = {
      difficulty: 17, // `difficulty` must be a number between 17 and 81
      puzzle: "",
      initPuzzle: "",
      activeSlot: null,
      activeSlotValue: null,
      halp: null
    };
  }

  setNumForActiveSlot = num => {
    if (this.state.initPuzzle[this.state.activeSlot] !== "•") return;
    let puzzle = this.state.puzzle.split("");
    puzzle.splice(this.state.activeSlot, 1, num);
    puzzle = puzzle.join("");
    this.setState({ puzzle });
  };

  getCandidate = () => {
    if (this.state.activeSlot === null) return;
    const result = generator.get_candidates(this.state.puzzle);
    if (result === false) return console.log("err");
    console.log(
      generator.get_candidates(this.state.puzzle).reduce((acc, curr) => {
        return acc.concat(curr);
      }, [])[this.state.activeSlot]
    );
  };

  getSolve = () => {
    console.log(generator.solve(this.state.puzzle));
  };

  getValidateBoard = () => {
    console.log(generator.validate_board(this.state.puzzle));
  };

  onKeyPress = ({ key }) => {
    console.log({ key });

    if (key === " ") {
      this.getCandidate();
    }

    const numPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (~numPad.indexOf(key)) {
      return this.setNumForActiveSlot(key);
    }

    const arrowEvents = {
      ArrowRight: () => this.onRightPressKey(),
      ArrowLeft: () => this.onLeftPressKey(),
      ArrowDown: () => this.onDownPressKey(),
      ArrowUp: () => this.onUpPressKey()
    };
    if (arrowEvents.hasOwnProperty(key)) return arrowEvents[key]();
  };

  onLeftPressKey = () => {
    const { activeSlot } = this.state;
    if (activeSlot === 0) return;
    this.setState({ activeSlot: activeSlot - 1 });
  };
  onRightPressKey = () => {
    const { activeSlot } = this.state;
    if (activeSlot === 80) return;
    this.setState({ activeSlot: activeSlot + 1 });
  };
  onDownPressKey = () => {
    const { activeSlot } = this.state;
    if (activeSlot >= 72) return;
    this.setState({ activeSlot: activeSlot + 9 });
  };
  onUpPressKey = () => {
    const { activeSlot } = this.state;
    if (activeSlot <= 8) return;
    this.setState({ activeSlot: activeSlot - 9 });
  };

  componentDidMount() {
    const puzzle = generator.generate(this.state.difficulty);
    window.addEventListener("keydown", this.onKeyPress);
    this.setState({ puzzle, initPuzzle: puzzle });
  }

  onClickSlot = index => () => {
    console.log(index);
    this.setState({
      activeSlot: index,
      activeSlotValue:
        this.state.puzzle[index] !== "•" ? this.state.puzzle[index] : null
    });
  };

  render() {
    const { puzzle, activeSlot } = this.state;
    return (
      <div>
        <table>
          <tbody>
            {splitPuzzleString(puzzle).map((row, i) => {
              return (
                <tr key={i + row}>
                  {row.split("").map((value, j) => (
                    <td key={j + i * 10 + value}>
                      <SudokuSlot
                        onClick={this.onClickSlot(j + i * 9, value)}
                        num={value}
                        active={this.state.activeSlotValue === value}
                        selected={j + i * 9 === activeSlot}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <SudokuNumPad onClick={this.setNumForActiveSlot} />
        <div onClick={this.getCandidate}>HELP</div>
        <div onClick={this.getSolve}>solve</div>
        <div onClick={this.getValidateBoard}>getValidateBoard</div>
      </div>
    );
  }
}

function splitPuzzleString(puzzle) {
  return puzzle.split(/(.{9})/).filter(_ => _);
}
