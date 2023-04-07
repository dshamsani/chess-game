import { FC, useEffect, useState } from "react";
import BoardComponent from "../components/BoardComponent/BoardComponent";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import LostFigures from "../components/LostFigures/LostFigures";
import Timer from "../components/Timer";

const Home: FC = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  };

  return (
    <main className={`w-[100vw] h-[100vh] flex justify-center items-center`}>
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer} />
      <div className="h-full justify-center items-center flex flex-col gap-3">
        <LostFigures title="Black figures" figures={board.lostBlackFigures} />
        <LostFigures title="White figures" figures={board.lostWhiteFigures} />
      </div>
    </main>
  );
};

export default Home;
