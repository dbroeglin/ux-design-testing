import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders the header with Swiss Re branding", () => {
    render(<App />);
    expect(screen.getByText("Swiss Re")).toBeInTheDocument();
    expect(screen.getByText("Tic Tac Toe")).toBeInTheDocument();
  });

  it("renders 9 empty squares", () => {
    render(<App />);
    const squares = screen.getAllByRole("button", { name: /empty square/i });
    expect(squares).toHaveLength(9);
  });

  it("shows initial status as Next player: X", () => {
    render(<App />);
    expect(screen.getByText("Next player: X")).toBeInTheDocument();
  });

  it("places X on click and switches turn", () => {
    render(<App />);
    const squares = screen.getAllByRole("button", { name: /empty square/i });
    fireEvent.click(squares[0]);
    expect(screen.getByText("Next player: O")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Square: X" })).toBeInTheDocument();
  });

  it("prevents clicking an occupied square", () => {
    render(<App />);
    const squares = screen.getAllByRole("button", { name: /empty square/i });
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[0]); // try clicking same square
    // Should still be O's turn since the second click was ignored
    expect(screen.getByText("Next player: O")).toBeInTheDocument();
  });

  it("detects a winner", () => {
    render(<App />);
    const squares = screen.getAllByRole("button", { name: /empty square/i });
    // X: 0, O: 3, X: 1, O: 4, X: 2 (top row win)
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins
    expect(screen.getByText("Winner: X")).toBeInTheDocument();
  });

  it("detects a draw", () => {
    render(<App />);
    const squares = screen.getAllByRole("button", { name: /empty square/i });
    // X O X
    // X X O
    // O X O
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[2]); // X
    fireEvent.click(squares[5]); // O
    fireEvent.click(squares[3]); // X
    fireEvent.click(squares[6]); // O
    fireEvent.click(squares[4]); // X
    fireEvent.click(squares[8]); // O
    fireEvent.click(squares[7]); // X
    expect(screen.getByText("It's a draw!")).toBeInTheDocument();
  });

  it("resets the game on New Game click", () => {
    render(<App />);
    const squares = screen.getAllByRole("button", { name: /empty square/i });
    fireEvent.click(squares[0]); // Place X
    fireEvent.click(screen.getByText("New Game"));
    expect(screen.getByText("Next player: X")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /empty square/i })).toHaveLength(9);
  });

  it("updates scores when a game is won", () => {
    render(<App />);
    const squares = screen.getAllByRole("button", { name: /empty square/i });
    // X wins top row
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins

    // Check Player X score is 1
    const scoreboard = screen.getByLabelText("Scoreboard");
    expect(scoreboard).toHaveTextContent("1");
  });
});
