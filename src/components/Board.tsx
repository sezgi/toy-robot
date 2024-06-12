/**
 * Board component
 * Notes:
 * - robotPosition is 1-indexed because of CSS grid
 * - initially, robot is off the board
 * - onPlace callback is called when a cell is clicked
 */

import { FC } from "react";
import Robot from "./Robot";

interface BoardProps {
  rows: number;
  cols: number;
  isRobotPlaced: boolean;
  robotPosition: { row: number; col: number };
  onPlace: (row: number, col: number) => void;
}

const Board: FC<BoardProps> = ({
  rows,
  cols,
  isRobotPlaced,
  robotPosition,
  onPlace,
}) => {
  return (
    <div
      className="board"
      style={{
        gridTemplateRows: `repeat(${rows}, minmax(100px, 1fr))`,
        gridTemplateColumns: `repeat(${cols}, minmax(100px, 1fr))`,
      }}
    >
      {Array(rows)
        .fill(null)
        .map((_, i) =>
          Array(cols)
            .fill(null)
            .map((_, j) => (
              <div
                key={`${i}-${j}`}
                className="cell"
                style={{
                  gridArea: `${i + 1} / ${j + 1} / span 1 / span 1`,
                }}
                onClick={() => onPlace(i + 1, j + 1)}
              ></div>
            ))
        )}
      {isRobotPlaced ? (
        <Robot row={robotPosition.row} col={robotPosition.col} />
      ) : null}
    </div>
  );
};

export default Board;
