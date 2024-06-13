/**
 * Toy Robot Simulator
 */

import { useCallback, useEffect, useState } from "react";
import Robot from "./components/Robot";
import Board from "./components/Board";
import { Direction, Position } from "./types";
import { COLS, DIRECTION_MAP, DIRECTIONS, ROWS } from "./constants";
import "./App.css";

export default function App() {
  const [isRobotPlaced, setIsRobotPlaced] = useState(false);
  const [position, setPosition] = useState<Position>({ row: ROWS, col: 1 });
  const [direction, setDirection] = useState<Direction>(Direction.North);
  const [angleCount, setAngleCount] = useState(0);
  const [doAnimate, setDoAnimate] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const dirIndex = DIRECTIONS.indexOf(direction);

  const handlePlace = useCallback(
    (row: number, col: number) => {
      if (isRobotPlaced) {
        setPosition({ row, col });
        setDirection(Direction.North);
        setAngleCount(0);
        setDoAnimate(false); // prevent rotation animation
      }
    },
    [isRobotPlaced]
  );

  const handleRotate = useCallback(
    (reverse = false) => {
      const newDirIndex = reverse ? (dirIndex + 3) % 4 : (dirIndex + 1) % 4;
      setDirection(DIRECTIONS[newDirIndex]);
      setAngleCount((angleCount) => angleCount + (reverse ? -1 : 1));
      setDoAnimate(true);
      setShowReport(false);
    },
    [dirIndex, angleCount]
  );

  const handleMove = useCallback(() => {
    const { row, col } = position;
    const newPosition: Position[] = [
      { row: Math.max(row - 1, 1), col },
      { row, col: Math.min(col + 1, COLS) },
      { row: Math.min(row + 1, ROWS), col },
      { row, col: Math.max(col - 1, 1) },
    ];
    setPosition(newPosition[dirIndex]);
    setShowReport(false);
  }, [position, dirIndex]);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
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
    },
    [isRobotPlaced, handleRotate, handleMove]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div className="container">
      <h1>Toy Robot Simulator</h1>
      {showReport && (
        <p className="report">
          {position.col - 1}, {ROWS - position.row}, {DIRECTION_MAP[direction]}
        </p>
      )}
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
          <button
            className="place-button"
            onClick={() => setIsRobotPlaced(true)}
          >
            <Robot /> Place me!
          </button>
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
