import { render, screen, within, fireEvent } from "@testing-library/react";

import Board from "./Board";

const ROWS = 2;
const COLS = 3;

describe("Board component", () => {
  it("renders Board component", async () => {
    render(<Board />);
    const board = await screen.findByTestId("board");
    expect(board).toBeInTheDocument();
  });

  it("renders correct number of rows and cols", async () => {
    render(<Board rows={ROWS} cols={COLS} />);
    const board = screen.getByTestId("board");
    const cells = within(board).getAllByTestId(/cell-\d+-\d+/);
    expect(cells).toHaveLength(ROWS * COLS);
  });

  it("does not render robot initially", async () => {
    render(<Board />);
    const board = screen.getByTestId("board");
    const robot = within(board).queryByTestId("robot");
    expect(robot).not.toBeInTheDocument();
  });

  it("renders robot if isRobotPlaced is true", async () => {
    render(<Board rows={ROWS} cols={COLS} isRobotPlaced />);
    const board = screen.getByTestId("board");
    const robot = within(board).queryByTestId("robot");
    expect(robot).toBeInTheDocument();
  });

  it("clicking on a cell calls onPlace with row and col, if robot is placed", async () => {
    const onPlace = jest.fn();
    render(<Board rows={ROWS} cols={COLS} isRobotPlaced onPlace={onPlace} />);
    const cell = screen.getByTestId("cell-1-2");
    fireEvent.click(cell);
    expect(onPlace).toHaveBeenCalledWith(1, 2);
  });
});
