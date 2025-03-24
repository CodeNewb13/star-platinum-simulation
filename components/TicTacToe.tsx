"use client"; // Required for Client Components in Next.js

import { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const winner = checkWinner(board);

  function handleClick(index: number) {
    if (board[index] || winner) return;
  
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = isXTurn ? "X" : "O";
      console.log("Updated Board:", newBoard); // Debugging
      return newBoard;
    });
  
    setIsXTurn((prev) => !prev);
  }

  function resetGame() {
    setBoard(Array(9).fill(null)); // Reset board
    setIsXTurn(true); // X starts again
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, i) => (
          <button key={i} className="square" onClick={() => handleClick(i)}>
            {cell || " "} {/* Ensures empty spaces are clickable */}
          </button>
        ))}
      </div>
      {winner && <p className="winner">Winner: {winner} 🎉</p>}
      {!winner && board.every((cell) => cell) && <p className="draw">It's a Draw! 🤝</p>}
      <button className="reset" onClick={resetGame}>Restart</button>

      <style jsx>{`
        .game { text-align: center; font-family: Arial, sans-serif; }
        .board { display: grid; grid-template-columns: repeat(3, 100px); gap: 5px; justify-content: center; }
        .square {
          width: 100px;
          height: 100px;
          font-size: 2.5rem;
          font-weight: bold;
          cursor: pointer;
          background: #eee;
          border: 2px solid #333;
          display: flex;
          align-items: center;
          justify-content: center;
          color: black; 
        }
        .winner, .draw { font-size: 1.5rem; margin: 10px 0; }
        .reset {
          margin-top: 10px;
          padding: 8px 15px;
          font-size: 1rem;
          cursor: pointer;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}

function checkWinner(board: (string | null)[]): string | null {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  for (let [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winner (X or O)
    }
  }
  return null;
}
