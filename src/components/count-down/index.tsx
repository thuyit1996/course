'use client';
import React, { useState, useEffect, useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { InvokeTimmer } from '../writing';
import { WritingFeedback } from '@/types/exam';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
interface CountdownTimerProps {
  submitExample: () => void;
  onCancel: () => void;
  onUpdateStatus: (isStart: boolean) => void;
  onStop: () => void;
  response?: WritingFeedback;
  onRetake?: () => void;
  isReview?: boolean;
  examId?: string
}

const CoundownTimer = forwardRef<InvokeTimmer, CountdownTimerProps>(
  ({ submitExample, onCancel, onUpdateStatus, onStop, response, onRetake, isReview = false, examId }, ref: Ref<InvokeTimmer>) => {
    const duration = 20 * 60; // 20 minutes
    const radius = 90;
    const strokeWidth = 15;
    const circumference = 2 * Math.PI * radius;
    const [, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isFinishTest, setIsFinishTest] = useState(false);
    const router = useRouter();

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const formatTime = (seconds: number) => {
      const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
      const secs = String(seconds % 60).padStart(2, '0');
      return `${mins}:${secs}`;
    };

    const startCountdown = () => {
      if (intervalRef.current !== null) return;
      setIsRunning(true);
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as unknown as number);
            intervalRef.current = null;
            setIsRunning(false);
            onStop();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      onUpdateStatus(true);
    };

    useEffect(() => {
      return () => clearInterval(intervalRef.current as unknown as number);
    }, []);

    const offset = circumference - (timeLeft / duration) * circumference;
    const onSubmitExam = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsPaused(true);
      }
      submitExample();
    }

    useImperativeHandle(ref, () => ({
      invokeCountDown: () => resumeCountdown(),
      forceFinish: () => forceFinish()
    }));

    const resumeCountdown = () => {
      if (intervalRef.current !== null || timeLeft <= 0) return;
      setIsRunning(true);
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as unknown as number);
            intervalRef.current = null;
            setIsRunning(false);
            onStop();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    };

    const resetCountdown = () => {
      clearInterval(intervalRef.current as unknown as number );
      intervalRef.current = null;
      setIsRunning(false);
      setIsPaused(false);
      setIsResetting(true);
      setTimeLeft(duration);
      setTimeout(() => setIsResetting(false), 50);
      onCancel();
    };

    const onRetakeHandle = () => {
      resetCountdown();
      onRetake?.();
    }

    const forceFinish = () => {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      setTimeLeft(0);
      setIsRunning(false);
      setIsPaused(false);
      onStop();
      setIsFinishTest(true);
    };

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
              style={{ transition: isResetting ? 'none' : 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute  text-[40px] leading-[32px] font-medium text-gray-700">
            {(timeLeft === 0 || isFinishTest) ? 'Finish' : formatTime(timeLeft)}
            {/* {formatTime(timeLeft)} */}
          </div>
        </div>
        {
          (isFinishTest || isReview) ?
            <div className='flex flex-col'>
              <button
                className="mt-10 mr-4 w-full px-4 py-2.5 border border-gray-100 bg-white text-[#2c2c2c] text-sm font-semibold rounded-lg transition"
                onClick={() => {
                  if(isReview) {
                    router.push(`/writing-test/start/${examId}`)
                  }else {
                    window.location.reload()
                  }
                }}
              >Try the Test Again</button>
              <Link href={'/writing-test'}>
<button
                className="mt-4 px-4 py-2.5 w-full border border-indigo-100 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-lg transition"
              >
                Choose Another Test</button>
              </Link>
              
            </div>
            : (isRunning || timeLeft === 0) ? <div>
              <button
                className="mt-10 mr-4 px-4 py-2.5 border border-gray-100 bg-white text-[#2c2c2c] text-sm font-semibold rounded-lg transition"
                onClick={() => router.push('/writing-test')}
              >Cancel</button>
              <button
                className="mt-10 px-4 py-2.5 border border-indigo-100 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-lg transition"
                onClick={onSubmitExam}
              >
                Submit</button>
            </div> : <button
              onClick={startCountdown}
              disabled={isRunning}
              className="mt-10 px-4 py-2.5 border border-indigo bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-lg transition"
            >
              Start
            </button>
        }
      </div>
    );
  })

export default CoundownTimer;
CoundownTimer.displayName = 'CountDownTimer'