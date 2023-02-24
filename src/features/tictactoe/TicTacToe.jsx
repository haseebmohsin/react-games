import { useState } from 'react';
import './tictactoe.css';

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const calculateNextValue = (squares) => {
    const xSquaresCount = squares.filter((r) => r === 'X').length;
    const oSquaresCount = squares.filter((r) => r === 'O').length;
    return oSquaresCount === xSquaresCount ? 'X' : 'O';
  };

  const calculateStatus = (winner, squares, nextValue) => {
    return winner ? `Winner: ${winner}` : squares.every(Boolean) ? `Scratch: Cat's Game` : `Next Player: ${nextValue}`;
  };

  function calculateWinner(squares) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  const renderSquare = (index) => {
    return (
      <button id='square' onClick={() => selectSquare(index)}>
        {squares[index]}
      </button>
    );
  };

  const selectSquare = (index) => {
    if (squares[index] || winner) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[index] = nextValue;
    setSquares(squaresCopy);
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
  };

  return (
    <>
      <div className='flex flex-col gap-6'>
        <p className='text-lg font-bold text-center text-gray-500'>{status}</p>

        <div id='board'>
          <div className='board-row'>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className='board-row'>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className='board-row'>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>

        <button id='restart_btn' onClick={restart}>
          Restart
        </button>
      </div>
    </>
  );
}

export default TicTacToe;
