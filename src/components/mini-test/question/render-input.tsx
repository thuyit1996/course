import { QuestionItemProps } from "@/types/exam";

export const RenderInput = ({ index, id, answers, isFinish, correctAnswer, value, onChange }: QuestionItemProps) => {

  return <div>
    <textarea
      className="w-full mt-4 bg-gray-50 rounded-lg border-0 overflow-auto focus:outline-none text-sm lg:text-base text-[#262626] placeholder-gray-400 resize-none disabled:opacity-50"
      placeholder={""}
      value={value}
      disabled={isFinish}
      onChange={(event) => onChange(id, event.target.value)}
    />
    {isFinish && <div>
      Đáp án đúng: {correctAnswer}
    </div>}
  </div>
}