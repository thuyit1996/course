import { MiniTestCardItem, UserAnswerList } from "@/types/exam";
import { useState } from "react";
import { ListQuestion } from "../list-question";
import { RenderQuestionAnswer } from "./render-question-answer";

export const QuestionGrid = ({ cards, isFinish, isHide, onChange }: {
  cards: MiniTestCardItem[],
  isFinish: boolean,
  isHide?: boolean,
  onChange?: (questionId: string, answer: string) => void;
}) => {
  const [answers, setAnswers] = useState<UserAnswerList>({});

  const handleSelect = (questionId: string, answer: string) => {
    console.log('questionId', questionId)
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    onChange?.(questionId, answer);
  };

  return <div className="gap-2 grid grid-cols-12 w-full">
    <div className={'col-span-8'}>
      {/* Questions */}
      <div className="flex-1 space-y-6 overflow-y-auto px-4" data-aos="fade-right">
        <RenderQuestionAnswer cards={cards} isFinish={isFinish} isHide={isHide} handleSelect={handleSelect} answers={answers} />
      </div>

    </div>
    <div className='rounded-lg col-span-4 sticky max-h-[444px] top-[104px]' data-aos="fade-left">
      <ListQuestion cards={cards} answers={answers} isFinish={isFinish} />
    </div>
  </div>
}