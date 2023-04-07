import React, { FC, useEffect, useRef, useState } from "react";
import { Player } from "../../models/Player";
import { Colors } from "../../models/Colors";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => prev - 1);
  }
  function decrementWhiteTimer() {
    setWhiteTime((prev) => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-6 pr-4">
      <h2>Enemy - {blackTime}s</h2>
      <div className=" p-1">
        <button className=" bg-[#e8edf9] hover:bg-[#b7c0d8] duration-300 rounded-md p-2" onClick={handleRestart}>
          Restart game
        </button>
      </div>
      <h2>You - {whiteTime}s</h2>
    </div>
  );
};

export default Timer;
