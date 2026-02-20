import { describe, it, expect } from "vitest";
import { calculateWinner, isDraw, getStatus } from "../gameLogic";

describe("calculateWinner", () => {
  it("returns null for an empty board", () => {
    const board = Array(9).fill(null);
    expect(calculateWinner(board)).toBeNull();
  });

  it("detects a row win", () => {
    const board = ["X", "X", "X", null, "O", "O", null, null, null];
    expect(calculateWinner(board)).toEqual({ player: "X", line: [0, 1, 2] });
  });

  it("detects a column win", () => {
    const board = ["O", "X", null, "O", "X", null, "O", null, null];
    expect(calculateWinner(board)).toEqual({ player: "O", line: [0, 3, 6] });
  });

  it("detects a diagonal win", () => {
    const board = ["X", "O", null, null, "X", "O", null, null, "X"];
    expect(calculateWinner(board)).toEqual({ player: "X", line: [0, 4, 8] });
  });

  it("detects anti-diagonal win", () => {
    const board = [null, null, "O", null, "O", null, "O", "X", "X"];
    expect(calculateWinner(board)).toEqual({ player: "O", line: [2, 4, 6] });
  });

  it("returns null when no winner yet", () => {
    const board = ["X", "O", "X", null, null, null, null, null, null];
    expect(calculateWinner(board)).toBeNull();
  });
});

describe("isDraw", () => {
  it("returns false for an empty board", () => {
    expect(isDraw(Array(9).fill(null))).toBe(false);
  });

  it("returns true for a full board with no winner", () => {
    const board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(isDraw(board)).toBe(true);
  });

  it("returns false when there is a winner", () => {
    const board = ["X", "X", "X", "O", "O", null, null, null, null];
    expect(isDraw(board)).toBe(false);
  });
});

describe("getStatus", () => {
  it('shows "Next player: X" at game start', () => {
    expect(getStatus(Array(9).fill(null), true)).toBe("Next player: X");
  });

  it('shows "Next player: O" when it is O\'s turn', () => {
    const board = ["X", null, null, null, null, null, null, null, null];
    expect(getStatus(board, false)).toBe("Next player: O");
  });

  it("shows winner", () => {
    const board = ["X", "X", "X", "O", "O", null, null, null, null];
    expect(getStatus(board, false)).toBe("Winner: X");
  });

  it("shows draw", () => {
    const board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(getStatus(board, true)).toBe("It's a draw!");
  });
});
