"use client"

import { MiniTestList } from "@/types/exam";
import { useMemo, useState } from "react";
import resp from "./mockData.json";
import Starting from "./starting";
import MiniTestWelcome from "./welcome";
import { onGenNewQuestionID } from "./utils";

const MiniTest = ({ data }: { data: MiniTestList }) => {
  const cards = useMemo(() => {
    return onGenNewQuestionID(data.cards);
  }, [data]);

  const [isStarting, setIsStarting] = useState(false);

  const onStartNow = () => {
    setIsStarting(true)
  }

  return (
    <div className="mt-6 pb-6">
      {!isStarting &&
        <MiniTestWelcome onStartNow={onStartNow} />
      }
      {isStarting && <Starting cards={cards} />}

    </div>
  )
}
export default MiniTest