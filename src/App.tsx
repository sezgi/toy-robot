/**
 * Toy Robot Simulator
 */

import { useEffect, useState } from "react";
import Robot from "./components/Robot";
import Board from "./components/Board";
import "./App.css";

const ROWS = 5;
const COLS = 5;
const DIRECTIONS = ["N", "E", "S", "W"];
const DIRECTION_MAP: { [key: string]: string } = {
  N: "North",
  E: "East",
  S: "South",
  W: "West",
};

export default function App() {
  const [isRobotPlaced, setIsRobotPlaced] = useState(false);
  const [position, setPosition] = useState({ row: ROWS, col: 1 });
  const [direction, setDirection] = useState("N");
  const [angleCount, setAngleCount] = useState(0);
  const [doAnimate, setDoAnimate] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const dirIndex = DIRECTIONS.indexOf(direction);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (isRobotPlaced) {
        switch (event.key) {
          case "ArrowLeft":
            handleRotate(true);
            break;
          case "ArrowRight":
            handleRotate();
            break;
          case "m":
            handleMove();
            break;
          case "r":
            setShowReport(true);
            break;
          default:
            break;
        }
      } else if (event.key === "p") {
        setIsRobotPlaced(true);
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [isRobotPlaced, direction, position]);

  const handlePlace = (row: number, col: number) => {
    if (isRobotPlaced) {
      setPosition({ row, col });
      setDirection("N");
      setAngleCount(0);
      setDoAnimate(false); // prevent rotation animation
    }
  };

  const handleRotate = (reverse = false) => {
    const newDirIndex = reverse ? (dirIndex + 3) % 4 : (dirIndex + 1) % 4;
    setDirection(DIRECTIONS[newDirIndex]);
    setAngleCount((angleCount) => angleCount + (reverse ? -1 : 1));
    setDoAnimate(true);
    setShowReport(false);
  };

  const handleMove = () => {
    const { row, col } = position;
    const positionArr = [
      { row: Math.max(row - 1, 1), col },
      { row, col: Math.min(col + 1, COLS) },
      { row: Math.min(row + 1, ROWS), col },
      { row, col: Math.max(col - 1, 1) },
    ];
    setPosition(positionArr[dirIndex]);
    setShowReport(false);
  };

  return (
    <div className="container">
      <h1>Toy Robot Simulator</h1>
      <Board
        rows={ROWS}
        cols={COLS}
        isRobotPlaced={isRobotPlaced}
        position={position}
        angle={angleCount * 90}
        doAnimate={doAnimate}
        onPlace={handlePlace}
      />
      <div className="controls">
        {!isRobotPlaced && (
          <>
            <button onClick={() => setIsRobotPlaced(true)}>Place me!</button>
            <Robot />
          </>
        )}
        {isRobotPlaced && (
          <div className="buttons">
            <button onClick={() => handleRotate(true)}>Left</button>
            <button onClick={() => handleRotate()}>Right</button>
            <button onClick={handleMove}>Move</button>
            <button onClick={() => setShowReport(true)}>Report</button>
          </div>
        )}
      </div>
      {showReport && (
        <p>
          {position.col - 1}, {ROWS - position.row}, {DIRECTION_MAP[direction]}
        </p>
      )}

      <div className="key">
        <ul>
          <li>&lt;&gt;: rotate</li>
          <li>m: move</li>
          <li>p: place</li>
          <li>r: report</li>
        </ul>
      </div>
    </div>
  );
}
