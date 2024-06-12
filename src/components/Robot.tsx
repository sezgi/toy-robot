/**
 * Robot component
 * Notes:
 * - Position is 1-indexed because of CSS grid
 */

import { FC } from "react";

interface RobotProps {
  row?: number;
  col?: number;
}

const Robot: FC<RobotProps> = ({ row = 1, col = 1 }) => {
  return (
    <div
      className="robot"
      style={{
        gridArea: `${row} / ${col} / span 1 / span 1`,
      }}
    >
      BOT
    </div>
  );
};

export default Robot;
