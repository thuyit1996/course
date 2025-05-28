/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from "../ui/button/Button";

const MiniTestWelcome = ({ onStartNow }: { onStartNow: () => void }) => {
  return (
    <div className="flex justify-center">
      <div className="w-[640px] bg-white p-10 rounded-lg shadow text-center text-indigo-600">
        <div className="uppercase font-bold text-3xl">mini test</div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mt-6 mb-6 h-16 w-16 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 3.487a2.25 2.25 0 113.182 3.182L6.75 19.963l-4.5 1.5 1.5-4.5 13.112-13.476z"
          />
        </svg>
        
        <div className="mt-7 text-lg">This test contains 20 questions to be completed in 15 minutes.</div>
        <div className="text-lg">Make sure to manage your time wisely!</div>
        <Button className="mt-7" onClick={onStartNow}>Start Now</Button>
      </div>
    </div>
  )
}
export default MiniTestWelcome