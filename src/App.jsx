import { useState } from "react";
const TURNS = {
  X: "x",
  O: "o",
};
import "./App.css";

const combinacion_ganar = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const comprobar = (position) => {
  if (position == historialMovO[1] || position == historialMovX[1]) {
    return "ultimo";
  }
  return "";
};
let historialMovO = [-1, -1, -1, -1];
let historialMovX = [-1, -1, -1, -1];
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${comprobar(index)} ${children} ${
    isSelected ? "is-selected" : ""
  }`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
function App() {
  const movimientoHistorial = (turnos, posicion) => {
    if (turnos == "x") {
      historialMovX.shift();
      historialMovX.push(posicion);
      return historialMovX;
    } else {
      historialMovO.shift();
      historialMovO.push(posicion);
      return historialMovO;
    }
  };
  const [click, setClick] = useState(true);
  const [otraVez, setOtraVez] = useState("");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [puntoO, setPuntoO] = useState(0);
  const [puntoX, setPuntoX] = useState(0);
  const updateBoard = (index) => {
    if (click && board[index] == null) {
      const indexTwo = movimientoHistorial(turn, index);
      if (board[index]) return;
      const newBoard = [...board];
      newBoard[index] = turn;
      if (indexTwo[0] >= 0) {
        newBoard[indexTwo[0]] = null;
      }
      setBoard(newBoard);

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);
      checkWinner(newBoard);
    }
  };

  const checkWinner = (checkBoard) => {
    for (const combo of combinacion_ganar) {
      const [a, b, c] = combo;
      if (
        checkBoard[a] &&
        checkBoard[a] == checkBoard[b] &&
        checkBoard[b] == checkBoard[c]
      ) {
        historialMovO = [-1, -1, -1, -1];
        historialMovX = [-1, -1, -1, -1];
        setOtraVez("active");
        setClick(false);
        if (checkBoard[a] == "x") {
          setPuntoX(+1);
        } else {
          setPuntoO(+1);
        }
      }
    }
  };
  const reiniciar = () => {
    setBoard(Array(9).fill(null));
    setOtraVez("");
    setClick(true);
  };
  return (
    <main className="board">
      <h1>Tic-Tac-Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        <span id="bloque"></span>
      </section>
      <span className={`otraVez ${otraVez}`} onClick={() => reiniciar()}>
        Otra vez
      </span>
      <div id="tablaPuntaje">
        <h2>Puntaje</h2>
        <x-text>X: {puntoX}</x-text>
        <x-text>O: {puntoO}</x-text>
      </div>
    </main>
  );
}

export default App;
