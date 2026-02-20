# Tic Tac Toe – Swiss Re Design System

A tic-tac-toe web application built with React and Vite, styled following the [Swiss Re](https://www.swissre.com) design system.

## Features

- Two-player tic-tac-toe with alternating X and O turns
- Win detection for rows, columns, and diagonals
- Draw detection when the board is full
- Score tracking across multiple games
- New Game button to reset the board
- Accessible UI with ARIA labels and keyboard navigation

## Design System

The application follows the Swiss Re brand guidelines:

- **Primary color** ("Lake"): `#006E73` – pine green used for header, buttons, and X marks
- **Typography**: Helvetica Neue / Arial sans-serif stack
- **Layout**: Clean card-based design with subtle borders and shadows
- **Components**: BEM-style CSS class naming (`sr-header`, `sr-card`, `sr-board`, etc.)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm run dev`    | Start development server       |
| `npm run build`  | Build for production            |
| `npm run preview`| Preview production build        |
| `npm run test`   | Run tests with Vitest           |
| `npm run lint`   | Lint with ESLint                |
