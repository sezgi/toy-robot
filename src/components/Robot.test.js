import { render, screen } from "@testing-library/react";

import Robot from "./Robot";

describe("Robot component", () => {
  it("renders Robot component", async () => {
    render(<Robot />);
    const robot = await screen.findByTestId("robot");
    expect(robot).toBeInTheDocument();
  });

  it("renders robot at correct position", async () => {
    render(<Robot row={2} col={3} />);
    const robot = await screen.findByTestId("robot");
    expect(robot).toHaveStyle("grid-area: 2 / 3 / span 1 / span 1");
  });

  it("renders robot facing correct direction", async () => {
    render(<Robot row={2} col={3} angle={90} />);
    const robot = await screen.findByTestId("robot");
    expect(robot).toHaveStyle("transform: rotate(90deg)");
  });
});
