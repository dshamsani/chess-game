import { FC, useEffect, useState } from "react";
import styles from "../../styles/Layout.module.scss";
import { Board } from "../../models/Board";
import React from "react";
import CellComponent from "../CellComponent/CellComponent";
import { Cell } from "../../models/Cell";
import { Player } from "../../models/Player";
import { Roboto } from "next/font/google";

interface IBoardComponent {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const BoardComponent: FC<IBoardComponent> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function handleClick(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h3 className={`${roboto.className} text-[20px]`}>Current player: {currentPlayer?.color === "white" ? "You" : "Enemy"}</h3>
      <div className={`${styles.board} flex flex-wrap`}>
        {board.cells.map((row, index) => {
          return (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent click={handleClick} cell={cell} key={cell.id} selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default BoardComponent;
