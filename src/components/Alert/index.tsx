"use client";

import React, { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";
import { setAlertHandler } from "@/libs/alert";
import SuccessIcon from '@/public/images/icons/success-alert.svg';
import CloseIcon from '@/public/images/icons/close.svg';
type AlertType = "success" | "error" | "info" | "warning";
type AlertPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | ReactNode>("");
  const [type, setType] = useState<AlertType>("info");
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<AlertPosition>("top-right");

  useEffect(() => {
    setAlertHandler((type: AlertType, message: string | ReactNode, pos?: AlertPosition) => {
      setType(type);
      setMessage(message);
      setPosition(pos || "top-right");
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    });
  }, []);

  const typeClasses = {
    success: "bg-success-50 text-[#2c2c2c] border-[#079455]",
    error: "bg-red-100 text-red-800 border-red-400",
    info: "bg-blue-100 text-blue-800 border-blue-400",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
  };

  const positionClasses = {
    "top-left": "top-6 left-6",
    "top-right": "top-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
  };

  return (
    <>
      {visible && (
        <div
          className={clsx(
            "fixed z-50 p-5 border rounded-xl transition-all duration-300",
            typeClasses[type],
            positionClasses[position]
          )}
        >
          <div className="flex justify-between">
              <SuccessIcon className="mr-4"/>
              <div className="">
                {message}
              </div>
            <CloseIcon className="ml-4 mt-1 cursor-pointer" onClick={() => setVisible(false)}/>
          </div>
        </div>
      )}
      {children}
    </>
  );
};