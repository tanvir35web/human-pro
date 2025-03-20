"use client";

import { useState, useEffect } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import formatTime from "@/app/utils/formatTime";
import { BiTask } from "react-icons/bi";

interface TimerCardProps {
  nameOfPlan: string;
  estimatedTime: string;
}

export default function TimerCard({
  nameOfPlan,
  estimatedTime,
}: TimerCardProps): JSX.Element {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Helper function to safely access localStorage
  const getStoredValue = (key: string, defaultValue: string): string => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  };

  // Load stored timer state on mount
  useEffect(() => {
    setTime(Number(getStoredValue("timer", "0")));
    setIsRunning(getStoredValue("isRunning", "false") === "true");
  }, []);

  // Update localStorage when timer state changes
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
          localStorage.setItem("timer", String(newTime));
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    localStorage.setItem("timer", "0");
    localStorage.setItem("isRunning", "false");
  };

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="relative w-[500px] h-[300px] p-4 rounded-xl shadow border border-gray-200 bg-gray-50 text-gray-700 font-semibold text-5xl flex flex-col items-center ">
      <p className="text-base flex items-center gap-2 w-full bg-green-100 border border-green-200 p-2 rounded-md text-green-800">
        <BiTask size={20} />
        {nameOfPlan}
      </p>
      <p className="w-full text-sm text-gray-600 hidden">{estimatedTime}</p>

      <div className="flex gap-6 mt-12">
        {[
          { label: "Hours", value: hours },
          { label: "Minutes", value: minutes },
          { label: "Seconds", value: seconds },
        ].map(({ label, value }, index, array) => (
          <div key={label} className="flex flex-col items-center">
            <p className="flex items-center gap-2">
              {value}
              <span
                className={`${index < array.length - 1 ? "block" : "hidden"}`}
              >
                :
              </span>
            </p>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        ))}
      </div>

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
