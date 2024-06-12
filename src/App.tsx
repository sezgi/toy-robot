/**
 * Toy Robot Simulator
 */

import { useState } from "react";
import Robot from "./components/Robot";
import Board from "./components/Board";
import "./App.css";

const ROWS = 5;
const COLS = 5;

export default function App() {
  const [isRobotPlaced, setIsRobotPlaced] = useState(false);
  const [robotPosition, setRobotPosition] = useState({ row: ROWS, col: 1 });

  const handlePlace = (row: number, col: number) => {
    if (isRobotPlaced) setRobotPosition({ row, col });
  };

  return (
    <div>
      <Board
        rows={ROWS}
        cols={COLS}
        isRobotPlaced={isRobotPlaced}
        robotPosition={robotPosition}
        onPlace={handlePlace}
      />
      {!isRobotPlaced && (
        <>
          <Robot />
          <button onClick={() => setIsRobotPlaced(true)}>Place</button>
        </>
      )}
    </div>
  );
}
