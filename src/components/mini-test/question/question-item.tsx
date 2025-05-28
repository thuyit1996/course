'use client';

import { QuestionItemProps } from '@/types/exam';
import { Flag } from 'lucide-react';
import { RenderOption } from './render-option';
import { RenderQuestion } from './render-question';
import { RenderInput } from './render-input';

export default function QuestionItem(props: QuestionItemProps) {
  const {
    index,
    id,
    audioSrc,
    imageSrc,
    questionText,
    type,
    isFinish,
    correctAnswer,
    value
  } = props

  return (
    <>
      <div className="bg-white rounded-lg shadow p-10">
        <div className="flex justify-between items-center">
          <h2 className="text-blue-700 font-semibold uppercase mb-2">Question {index} {isFinish ? <span className='text-gray-800 text-sm leading-relaxed italic font-normal'>{correctAnswer && correctAnswer === value ? '(1/1)' : '(0/1)'}</span> : ''}</h2>
          {/* <button className="text-blue-600 hover:text-blue-800 p-1">
            <Flag size={12} />
          </button> */}
        </div>
        <div className="items-start">
          <div className="md:col-span-6 space-y-4">
            <RenderQuestion audioSrc={audioSrc} imageSrc={imageSrc} index={index} questionText={questionText} />
          </div>
          {/* Answer Options */}
          <div className="flex flex-col space-y-2">
            {type === 1 && <RenderInput {...props} />}
            {type !== 1 && <RenderOption {...props} />}
          </div>
        </div>
      </div>
    </>

  );
}
