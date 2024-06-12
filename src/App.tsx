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

  const handlePlace = (row: number, col: number) => {
    if (isRobotPlaced) {
      setPosition({ row, col });
      setDirection("N");
      setAngleCount(0);
      setDoAnimate(false);
    }
  };

  const handleRotate = (reverse = false) => {
    const dirIndex = DIRECTIONS.indexOf(direction);
    const newDirIndex = reverse ? (dirIndex + 3) % 4 : (dirIndex + 1) % 4;
    setDirection(DIRECTIONS[newDirIndex]);
    setAngleCount((angleCount) => angleCount + (reverse ? -1 : 1));
    setDoAnimate(true);
  };

  return (
    <div>
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
          <>
            <button onClick={() => handleRotate(true)}>Left</button>
            <button onClick={() => handleRotate()}>Right</button>
          </>
        )}
      </div>
    </div>
  );
}
