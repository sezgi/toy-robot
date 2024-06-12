/**
 * Robot component
 * Notes:
 * - Position is 1-indexed because of CSS grid
 */

import { FC } from "react";

interface RobotProps {
  row?: number;
  col?: number;
  angle?: number;
  doAnimate?: boolean;
}

const Robot: FC<RobotProps> = ({
  row = 1,
  col = 1,
  angle = 0,
  doAnimate = true,
}) => {
  return (
    <div
      className="robot"
      style={{
        gridArea: `${row} / ${col} / span 1 / span 1`,
        transform: `rotate(${angle}deg)`,
        transition: doAnimate ? "all ease-in-out 0.25s" : "none",
      }}
    >
      BOT
    </div>
  );
};

export default Robot;
