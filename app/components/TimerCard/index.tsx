"use client";

import { useState, useEffect } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import formatTime from "@/app/utils/formatTime";
import { BiTask } from "react-icons/bi";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

interface TimerCardProps {
  nameOfPlan: string;
  estimatedTime: number;
}

export default function TimerCard({
  nameOfPlan,
  estimatedTime,
}: TimerCardProps): JSX.Element {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(estimatedTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isTimerCompleted, setIsTimerCompleted] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsed) => {
          const newElapsed = prevElapsed + 1;

          if (newElapsed >= estimatedTime) {
            setIsRunning(false);
            clearInterval(interval!);
            setIsTimerCompleted(true);
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
    setIsTimerCompleted(false);
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
    <div
      className={`relative w-[500px] h-[500px] p-4 rounded-xl shadow border border-gray-200 ${
        isTimerCompleted ? "bg-green-100" : "bg-gray-50"
      } text-gray-700 font-semibold flex flex-col items-center`}
    >
      <p className="text-base flex items-center gap-2 w-full bg-green-100 border border-green-200 p-2 rounded-md text-green-800">
        <BiTask size={20} />
        {nameOfPlan}
      </p>

      {/* Chart for Visual Representation */}
      <div className="mt-6">
        <Gauge
          width={200}
          height={200}
          value={(elapsedTime / estimatedTime) * 100}
          cornerRadius="50%"
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 20,
              color: "#fff",
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#52b202",
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: "#e0e0e0",
            },
          }}
        />
      </div>

      {/* Time Display */}
      <div className="flex flex-col gap-4 mt-4 text-center">
        <div className="text-gray-400 absolute top-40 right-[197px]">
          <p className="text-base">Elapsed Time</p>
          <p className="text-xl">{`${elapsedH}:${elapsedM}:${elapsedS}`}</p>
        </div>

        <div>
          <p className="text-lg text-gray-600">Remaining Time</p>
          <p className="text-5xl">{`${remainingH}:${remainingM}:${remainingS}`}</p>
        </div>
      </div>

      <p className="mt-4 text-green-800">
        {isTimerCompleted
          ? "Congratulations, You have done it!"
          : "Yes, You can do it!"}
      </p>

      {/* Controls */}
      <div className="absolute bottom-4 right-5 flex gap-6">
        <button
          onClick={toggleTimer}
          className={`p-3 bg-green-200 rounded-full text-gray-600 ${
            isTimerCompleted ? "hidden" : "block"
          }`}
        >
          {isRunning ? <BsPauseFill size={32} /> : <BsPlayFill size={32} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 bg-red-100 hover:bg-red-200 duration-150 text-red-700 rounded-lg hidden"
        >
          <GrPowerReset size={24} />
        </button>
      </div>
    </div>
  );
}
