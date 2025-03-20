"use client";

import { useState, useEffect } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import formatTime from "@/app/utils/formatTime";
import { BiTask } from "react-icons/bi";

interface TimerCardProps {
  nameOfPlan: string;
  estimatedTime: number; // now accepting estimated time as seconds
}

export default function TimerCard({
  nameOfPlan,
  estimatedTime,
}: TimerCardProps): JSX.Element {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(estimatedTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsed) => {
          const newElapsed = prevElapsed + 1;

          // Stop timer when it reaches estimated time
          if (newElapsed >= estimatedTime) {
            setIsRunning(false);
            clearInterval(interval!);
            return estimatedTime;
          }

          return newElapsed;
        });

        setRemainingTime((prevRemaining) =>
          prevRemaining > 0 ? prevRemaining - 1 : 0
        );
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, estimatedTime]);

  const resetTimer = () => {
    setElapsedTime(0);
    setRemainingTime(estimatedTime);
    setIsRunning(false);
  };

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const {
    hours: elapsedH,
    minutes: elapsedM,
    seconds: elapsedS,
  } = formatTime(elapsedTime);
  const {
    hours: remainingH,
    minutes: remainingM,
    seconds: remainingS,
  } = formatTime(remainingTime);

  return (
    <div className="relative w-[500px] h-[350px] p-4 rounded-xl shadow border border-gray-200 bg-gray-50 text-gray-700 font-semibold flex flex-col items-center">
      <p className="text-base flex items-center gap-2 w-full bg-green-100 border border-green-200 p-2 rounded-md text-green-800">
        <BiTask size={20} />
        {nameOfPlan}
      </p>

      {/* Timers */}
      <div className="flex flex-col gap-4 mt-8 text-center">
        {/* Elapsed Time */}
        <div className="text-gray-400">
          <p className="text-base ">Elapsed Time</p>
          <p className="text-xl">{`${elapsedH}:${elapsedM}:${elapsedS}`}</p>
        </div>

        {/* Remaining Time */}
        <div>
          <p className="text-lg text-gray-600">Remaining Time</p>
          <p className="text-5xl">{`${remainingH}:${remainingM}:${remainingS}`}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 flex gap-6">
        <button
          onClick={toggleTimer}
          className="p-3 bg-green-200 rounded-full text-gray-600"
        >
          {isRunning ? <BsPauseFill size={32} /> : <BsPlayFill size={32} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 bg-red-100 hover:bg-red-200 duration-150 text-red-700 rounded-md hidden"
        >
          <GrPowerReset size={24} />
        </button>
      </div>
    </div>
  );
}
