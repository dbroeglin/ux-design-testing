import { useState, useCallback } from "react";
import { calculateWinner, isDraw, getStatus } from "./gameLogic";

function Square({ value, onClick, disabled, highlight }) {
  const cls = [
    "sr-cell",
    value === "X" ? "sr-cell--x" : value === "O" ? "sr-cell--o" : "",
    highlight ? "sr-cell--winning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={cls}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square: ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
}

function Board({ squares, onSquareClick, winningLine }) {
  return (
    <div className="sr-board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onSquareClick(i)}
          disabled={!!value || !!calculateWinner(squares)}
          highlight={winningLine?.includes(i)}
        />
      ))}
    </div>
  );
}

function Scoreboard({ scores }) {
  return (
    <div className="sr-scoreboard" aria-label="Scoreboard">
      <div className="sr-scoreboard__item">
        <div className="sr-scoreboard__label">Player X</div>
        <div className="sr-scoreboard__value sr-scoreboard__value--x">
          {scores.X}
        </div>
      </div>
      <div className="sr-scoreboard__item">
        <div className="sr-scoreboard__label">Draws</div>
        <div className="sr-scoreboard__value">{scores.draws}</div>
      </div>
      <div className="sr-scoreboard__item">
        <div className="sr-scoreboard__label">Player O</div>
        <div className="sr-scoreboard__value">{scores.O}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const winner = calculateWinner(squares);
  const draw = isDraw(squares);
  const status = getStatus(squares, xIsNext);

  const handleClick = useCallback(
    (i) => {
      if (squares[i] || calculateWinner(squares)) return;
      const next = squares.slice();
      next[i] = xIsNext ? "X" : "O";
      setSquares(next);
      setXIsNext(!xIsNext);

      const result = calculateWinner(next);
      if (result) {
        setScores((s) => ({ ...s, [result.player]: s[result.player] + 1 }));
      } else if (next.every(Boolean)) {
        setScores((s) => ({ ...s, draws: s.draws + 1 }));
      }
    },
    [squares, xIsNext],
  );

  const handleReset = useCallback(() => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }, []);

  const statusClass = [
    "sr-status",
    winner ? "sr-status--winner" : "",
    draw ? "sr-status--draw" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className="sr-header">
        <span className="sr-header__logo">Swiss Re</span>
        <span className="sr-header__divider" aria-hidden="true" />
        <span className="sr-header__title">Tic Tac Toe</span>
      </header>

      <main className="sr-main">
        <div className="sr-card">
          <div className={statusClass} aria-live="polite">
            {status}
          </div>

          <Board
            squares={squares}
            onSquareClick={handleClick}
            winningLine={winner?.line}
          />

          <Scoreboard scores={scores} />

          <button className="sr-button" onClick={handleReset}>
            New Game
          </button>
        </div>
      </main>

      <footer className="sr-footer">
        © {new Date().getFullYear()} Swiss Re. Design system reference only.
      </footer>
    </>
  );
}
