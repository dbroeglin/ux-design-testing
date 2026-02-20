const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export function isDraw(squares) {
  return !calculateWinner(squares) && squares.every(Boolean);
}

export function getStatus(squares, xIsNext) {
  const winner = calculateWinner(squares);
  if (winner) return `Winner: ${winner.player}`;
  if (isDraw(squares)) return "It's a draw!";
  return `Next player: ${xIsNext ? "X" : "O"}`;
}
