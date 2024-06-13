import { render, screen, within, fireEvent } from "@testing-library/react";

import App from "./App";

describe("Before robot is placed", () => {
  it("renders App component", async () => {
    render(<App />);
    const heading = await screen.findByText(/Toy Robot Simulator/i);
    expect(heading).toBeInTheDocument();
  });

  it("robot is not on the board initially", async () => {
    render(<App />);
    const board = screen.getByTestId("board");
    const robot = within(board).queryByTestId("robot");
    expect(robot).not.toBeInTheDocument();
  });

  it("clicking on a cell doesn't place robot on the board", async () => {
    render(<App />);
    const cell = screen.getByTestId("cell-2-4");
    fireEvent.click(cell);
    const board = screen.getByTestId("board");
    const robot = within(board).queryByTestId("robot");
    expect(robot).not.toBeInTheDocument();
  });

  describe("Keyboard controls", () => {
    it("pressing p key places robot on the board", async () => {
      render(<App />);
      fireEvent.keyUp(document, { key: "p" });
      const board = screen.getByTestId("board");
      const robot = await within(board).findByTestId("robot");
      expect(robot).toBeInTheDocument();
    });
  });
});

describe("After robot is placed", () => {
  beforeEach(() => {
    render(<App />);
    const placeButton = screen.getByRole("button", { name: /Place me!/i });
    fireEvent.click(placeButton);
  });

  it("clicking place button places robot on the board", async () => {
    const board = screen.getByTestId("board");
    const robot = await within(board).findByTestId("robot");
    expect(robot).toBeInTheDocument();
  });

  it("clicking move button moves robot on the board", async () => {
    const robot = await screen.findByTestId("robot");
    expect(robot).toHaveStyle("grid-area: 5 / 1 / span 1 / span 1");
    const moveButton = await screen.findByRole("button", { name: /Move/i });
    fireEvent.click(moveButton);
    expect(robot).toHaveStyle("grid-area: 4 / 1 / span 1 / span 1");
  });

  it("clicking right button rotates robot clockwise", async () => {
    const robot = await screen.findByTestId("robot");
    expect(robot).toHaveStyle("transform: rotate(0deg)");
    const rightButton = await screen.findByRole("button", { name: /Right/i });
    fireEvent.click(rightButton);
    expect(robot).toHaveStyle("transform: rotate(90deg)");
  });

  it("clicking left button rotates robot counter-clockwise", async () => {
    const robot = await screen.findByTestId("robot");
    expect(robot).toHaveStyle("transform: rotate(0deg)");
    const leftButton = await screen.findByRole("button", { name: /Left/i });
    fireEvent.click(leftButton);
    expect(robot).toHaveStyle("transform: rotate(-90deg)");
  });

  it("rotated robot moves in correct direction", async () => {
    const robot = await screen.findByTestId("robot");
    expect(robot).toHaveStyle("grid-area: 5 / 1 / span 1 / span 1");
    const rightButton = await screen.findByRole("button", { name: /Right/i });
    fireEvent.click(rightButton);
    const moveButton = await screen.findByRole("button", { name: /Move/i });
    fireEvent.click(moveButton);
    expect(robot).toHaveStyle("grid-area: 5 / 2 / span 1 / span 1");
  });

  it("clicking report button shows robot's position and direction", async () => {
    const reportButton = await screen.findByRole("button", { name: /Report/i });
    fireEvent.click(reportButton);
    const report = await screen.findByText(/0, 0, North/i);
    expect(report).toBeInTheDocument();
  });

  it("reporting after moving and rotating shows correct position and direction", async () => {
    const moveButton = await screen.findByRole("button", { name: /Move/i });
    fireEvent.click(moveButton);
    const rightButton = await screen.findByRole("button", { name: /Right/i });
    fireEvent.click(rightButton);
    const reportButton = await screen.findByRole("button", { name: /Report/i });
    fireEvent.click(reportButton);
    const report = await screen.findByText(/0, 1, East/i);
    expect(report).toBeInTheDocument();
  });

  it("robot does not move off the board", async () => {
    const robot = await screen.findByTestId("robot");
    expect(robot).toHaveStyle("grid-area: 5 / 1 / span 1 / span 1");
    const leftButton = await screen.findByRole("button", { name: /Left/i });
    fireEvent.click(leftButton);
    const moveButton = await screen.findByRole("button", { name: /Move/i });
    fireEvent.click(moveButton);
    expect(robot).toHaveStyle("grid-area: 5 / 1 / span 1 / span 1");
  });

  it("clicking a cell places robot on that cell", async () => {
    const robot = await screen.findByTestId("robot");
    expect(robot).toHaveStyle("grid-area: 5 / 1 / span 1 / span 1");
    const cell = screen.getByTestId("cell-1-3");
    fireEvent.click(cell);
    expect(robot).toHaveStyle("grid-area: 1 / 3 / span 1 / span 1");
  });

  describe("Keyboard controls", () => {
    it("pressing right arrow rotates robot clockwise", async () => {
      const robot = await screen.findByTestId("robot");
      expect(robot).toHaveStyle("transform: rotate(0deg)");
      fireEvent.keyUp(document, { key: "ArrowRight" });
      expect(robot).toHaveStyle("transform: rotate(90deg)");
    });

    it("pressing left arrow rotates robot counter-clockwise", async () => {
      const robot = await screen.findByTestId("robot");
      expect(robot).toHaveStyle("transform: rotate(0deg)");
      fireEvent.keyUp(document, { key: "ArrowLeft" });
      expect(robot).toHaveStyle("transform: rotate(-90deg)");
    });

    it("pressing m key moves robot", async () => {
      const robot = await screen.findByTestId("robot");
      expect(robot).toHaveStyle("grid-area: 5 / 1 / span 1 / span 1");
      fireEvent.keyUp(document, { key: "m" });
      expect(robot).toHaveStyle("grid-area: 4 / 1 / span 1 / span 1");
    });

    it("pressing r key reports robot's position and direction", async () => {
      fireEvent.keyUp(document, { key: "r" });
      const report = await screen.findByText(/0, 0, North/i);
      expect(report).toBeInTheDocument();
    });
  });
});
