import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders App component", async () => {
    render(<App />);
    const heading = await screen.findByText(/Toy Robot Simulator/i);
    expect(heading).toBeInTheDocument();
  });
});
