'use client';
import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = () => {
  const duration = 0.4 * 60; // 20 minutes
  const radius = 90;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;

  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const startCountdown = () => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const offset = circumference - (timeLeft / duration) * circumference;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-[220px] h-[220px] flex items-center justify-center">
        <svg width="220" height="220" className="transform -rotate-90 absolute">
          <defs>
            <linearGradient id="timerGradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="url(#timerGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute  text-[40px] leading-[32px] font-medium text-gray-700">
        {timeLeft === 0 ? 'Finish' : formatTime(timeLeft)}
        </div>
      </div>
      <button
        onClick={startCountdown}
        disabled={isRunning}
        className="mt-10 px-4 py-2.5 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-lg transition"
      >
        Start
      </button>
    </div>
  );
};

export default CountdownTimer;
