'use client';

import { MiniTestCardItem, UserAnswerList } from '@/types/exam';
import { getCorrectAnswer } from '../utils';
import QuestionGroupItem from './question-group-item';
import { Flag } from 'lucide-react';


type GroupProps = {
  card: MiniTestCardItem;
  index: number;
  isFinish?: boolean;
  isHide?: boolean;
  answers: UserAnswerList;
  onChange: (questionId: string, answer: string) => void;
};

export default function QuestionGroup({ card, index, isFinish, answers, isHide, onChange }: GroupProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-10 ${isHide ? 'blur-sm brightness-125 contrast-110 rounded-md' : ''}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-blue-700 font-semibold uppercase mb-2">Question {index} </h2>
      </div>
      <div className="items-start">
        {/* Left Panel: Context */}
        <div className="">
          {card.question?.sound && (
            <audio controls className="w-full">
              <source src={card.question?.sound} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}

          {card.question?.text && (
            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {card.question?.text}
            </div>
          )}

          {card.question?.image && (
            <img
              src={card.question?.image}
              alt="context"
              className="w-full max-h-60 object-cover rounded"
            />
          )}
        </div>
        {/* Right Panel: Questions */}
        <div className="flex flex-col">
          {card?.childCards && card?.childCards.map((childCard, childIndex) => {
            return <div key={`question-${index}.${childIndex}`} id={`question-${index}-${childIndex + 1}`} className='mt-3'>
              <QuestionGroupItem
                id={childCard.id}
                index={`${index}-${childIndex + 1}`}
                isFinish={isFinish}
                questionText={childCard.question?.text}
                audioSrc={childCard.question?.sound}
                imageSrc={childCard.question?.image}
                answers={childCard?.answer?.choices ?? []}
                correctAnswer={getCorrectAnswer(childCard?.answer)}
                value={answers?.[childCard.id]}
                onChange={onChange}
                type={childCard.type}
              />
            </div>
          })}
        </div>
      </div>
    </div>
  );
}
