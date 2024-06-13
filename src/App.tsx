/**
 * Toy Robot Simulator
 */

import { useState } from "react";
import Robot from "./components/Robot";
import Board from "./components/Board";
import "./App.css";

const ROWS = 5;
const COLS = 5;
const DIRECTIONS = ["N", "E", "S", "W"];

export default function App() {
  const [isRobotPlaced, setIsRobotPlaced] = useState(false);
  const [position, setPosition] = useState({ row: ROWS, col: 1 });
  const [direction, setDirection] = useState("N");
  const [angleCount, setAngleCount] = useState(0);
  const [doAnimate, setDoAnimate] = useState(false);
  const dirIndex = DIRECTIONS.indexOf(direction);

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
  };

  return (
    <div className="container">
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
            <Robot />
            <button onClick={() => setIsRobotPlaced(true)}>Place</button>
          </>
        )}
        {isRobotPlaced && (
          <div className="buttons">
            <button onClick={() => handleRotate(true)}>Left</button>
            <button onClick={() => handleRotate()}>Right</button>
            <button onClick={handleMove}>Move</button>
          </div>
        )}
      </div>
    </div>
  );
}
