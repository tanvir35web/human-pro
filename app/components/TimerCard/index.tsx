"use client";
import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export default function TimerCard() {
  const [time, setTime] = useState(() => {
    return Number(localStorage.getItem("timer")) || 0;
  });
  const [isRunning, setIsRunning] = useState(() => {
    return localStorage.getItem("isRunning") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isRunning", String(isRunning));
  }, [isRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem("timer", String(newTime));
          return newTime;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return { hours, minutes, seconds };
  };

  return (
    <div className="relative w-[500px] h-[300px] p-2 rounded-xl shadow border border-gray-200 bg-gray-50  text-gray-700 font-semibold text-5xl flex items-center justify-center gap-4">
      <div className="flex flex-col gap-2 items-center justify-between">
        <div className="flex flex-row gap-4 items-center justify-center">
          <div className="flex flex-col gap-3 items-start justify-between">
            <p className="flex items-center gap-4">
              {formatTime(time).hours || "00"} <span className="pb-2"> :</span>
            </p>
            <p className="text-sm ps-2 text-gray-600">Hours</p>
          </div>

          <div className="flex flex-col gap-3 items-start justify-between">
            <p className="flex items-center gap-4">
              {formatTime(time).minutes || "00"}
              <span className="pb-2"> :</span>
            </p>
            <p className="text-sm text-gray-600">Minutes</p>
          </div>

          <div className="flex flex-col gap-3 items-start justify-between">
            <p className="flex items-center gap-4">
              {formatTime(time).seconds || "00"}
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
        {isRunning ? <Pause size={32} /> : <Play size={32} />}
      </button>
    </div>
  );
}
