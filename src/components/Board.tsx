/**
 * Board component
 * Notes:
 * - position is 1-indexed because of CSS grid
 * - initially, robot is off the board
 * - angle prop allows rotation
 * - doAnimate prop prevents rotation while placing
 * - onPlace callback is called when a cell is clicked
 */

import { FC, memo } from "react";
import Robot from "./Robot";
import { Position } from "../types";

interface BoardProps {
  rows?: number;
  cols?: number;
  isRobotPlaced?: boolean;
  position?: Position;
  angle?: number;
  doAnimate?: boolean;
  onPlace?: (row: number, col: number) => void;
}

const Board: FC<BoardProps> = ({
  rows = 5,
  cols = 5,
  isRobotPlaced,
  position = { row: 1, col: 1 },
  angle,
  doAnimate,
  onPlace = () => {},
}) => {
  return (
    <div
      className="board"
      style={{
        gridTemplateRows: `repeat(${rows}, minmax(100px, 1fr))`,
        gridTemplateColumns: `repeat(${cols}, minmax(100px, 1fr))`,
      }}
      data-testid="board"
    >
      {Array(rows)
        .fill(null)
        .map((_, i) =>
          Array(cols)
            .fill(null)
            .map((_, j) => (
              <button
                key={`${i}-${j}`}
                className="cell"
                disabled={!isRobotPlaced}
                style={{
                  gridArea: `${i + 1} / ${j + 1} / span 1 / span 1`,
                }}
                onClick={() => onPlace(i + 1, j + 1)}
                data-testid={`cell-${i + 1}-${j + 1}`}
              ></button>
            ))
        )}
      {isRobotPlaced && (
        <Robot
          row={position.row}
          col={position.col}
          angle={angle}
          doAnimate={doAnimate}
        />
      )}
    </div>
  );
};

export default memo(Board);
