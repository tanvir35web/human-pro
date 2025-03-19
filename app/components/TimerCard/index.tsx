"use client";
import { useState, useEffect } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

export default function TimerCard(): JSX.Element {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTime = Number(localStorage.getItem("timer")) || 0;
      const storedIsRunning = localStorage.getItem("isRunning") === "true";

      setTime(storedTime);
      setIsRunning(storedIsRunning);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isRunning", String(isRunning));
    }
  }, [isRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          if (typeof window !== "undefined") {
            localStorage.setItem("timer", String(newTime));
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // 🔥 NEW: Restart the timer automatically if it was running before reload
  useEffect(() => {
    if (isRunning) {
      setIsRunning(true); // Ensures the timer restarts automatically
    }
  }, [isRunning]);

  const formatTime = (
    time: number
  ): { hours: string; minutes: string; seconds: string } => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return { hours, minutes, seconds };
  };

  return (
    <div className="relative w-[500px] h-[300px] p-2 rounded-xl shadow border border-gray-200 bg-gray-50 text-gray-700 font-semibold text-5xl flex items-center justify-center gap-4">
      <div className="flex flex-col gap-2 items-center justify-between">
        <div className="flex flex-row gap-4 items-center justify-center">
          <div className="flex flex-col gap-3 items-start justify-between">
            <p className="flex items-center gap-4">
              {formatTime(time).hours} <span className="pb-2"> :</span>
            </p>
            <p className="text-sm ps-2 text-gray-600">Hours</p>
          </div>

          <div className="flex flex-col gap-3 items-start justify-between">
            <p className="flex items-center gap-4">
              {formatTime(time).minutes}
              <span className="pb-2"> :</span>
            </p>
            <p className="text-sm text-gray-600">Minutes</p>
          </div>

          <div className="flex flex-col gap-3 items-start justify-between">
            <p className="flex items-center gap-4">
              {formatTime(time).seconds}
              <span className="pb-2 collapse"> : </span>
            </p>
            <p className="text-sm text-gray-600">Seconds</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="p-3 bg-green-200 rounded-full absolute bottom-4 right-5"
      >
        {isRunning ? <BsPauseFill size={32} /> : <BsPlayFill size={32} />}
      </button>
      <button
        onClick={() => {
          setTime(0);
          localStorage.setItem("timer", "0");
          setIsRunning(!isRunning);
        }}
        className="p-3 bg-red-200 text-red-700 text-sm rounded-md absolute bottom-4 left-5"
      >
        Reset
      </button>
    </div>
  );
}
