import { MiniTestChoiceItem, QuestionItemProps } from "@/types/exam";
import { CircleCheck, CircleX } from 'lucide-react';

export const RenderOption = ({ index, id, answers, isFinish, correctAnswer, value, onChange }: QuestionItemProps) => {
  const renderRadioItem = (ans: MiniTestChoiceItem, idx: number) => {

    if (isFinish) {
      if (correctAnswer === ans.content) {
        return <>
          <span className="min-w-4.5 inline-block"><CircleCheck size={18} color="#4caf50"/></span>
          <span className={'text-success-500'}>{ans.content}</span>
        </>
      } else if (value == ans.content) {
        return <>
          
          <span className="min-w-4.5 inline-block"><CircleX size={18} color="#D92D20"/></span>
          <span className={'text-gray-950'}>{ans.content}</span>
        </>
      } else {
        return <>
          <input
            type="radio"
            name={`question-${index}`}
            value={ans.content}
            disabled={isFinish}
            checked={value === ans.content}
            onChange={() => onChange(id, ans.content)}
            className={`mr-0.5 form-radio cursor-pointer text-gray-400`}
            style={{ boxShadow: 'none' }}
          />
          <span className='text-gray-400'>{ans.content}</span>
        </>
      }
    }
    return <>
      <input
        type="radio"
        name={`question-${id}`}
        value={ans.content}
        disabled={isFinish}
        checked={value === ans.content}
        onChange={() => onChange(id, ans.content)}
        className={`mr-0.5 form-radio cursor-pointer text-red-600`}
        style={{ boxShadow: 'none' }}
      />
      <span>{ans.content}</span>
    </>
  }
  return <fieldset >
    {answers.map((ans, idx) => (
      <label key={idx} className={`flex items-center space-x-2 mt-2 p-2 rounded-md ${isFinish && value === ans.content && correctAnswer !== ans.content && 'bg-gray-100'}`}>
        {renderRadioItem(ans, idx)}
      </label>)
    )}
  </fieldset>
}