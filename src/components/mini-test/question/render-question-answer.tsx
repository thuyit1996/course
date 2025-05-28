import { MiniTestCardItem, UserAnswerList } from "@/types/exam";
import { getCorrectAnswer } from "../utils";
import QuestionGroup from "./question-group";
import QuestionItem from "./question-item";

export const RenderQuestionAnswer = ({ cards, isFinish, answers, isHide, handleSelect }: {
  cards: MiniTestCardItem[],
  isFinish: boolean,
  answers: UserAnswerList,
  isHide?: boolean,
  handleSelect: (questionId: string, answer: string) => void;
}) => {

  return <>
    {cards.map((q, index) => {
      if (!q.isQuestionGroup) {
        return (
          <div key={q.id} id={`question-${index + 1}`} className={`${isHide ? 'blur-sm brightness-125 contrast-110 rounded-md' : ''}`}>
            <QuestionItem
              id={q.id}
              index={`${index + 1}`}
              isFinish={isFinish}
              questionText={q.question?.text}
              audioSrc={q.question?.sound}
              imageSrc={q.question?.image}
              answers={q.answer.choices ?? []}
              correctAnswer={getCorrectAnswer(q.answer)}
              value={answers?.[q.id]}
              onChange={(id, ans) => handleSelect(id, ans)}
              type={q.type ?? q.answer.text ? 1 : 0}
            />
          </div>
        );
      } else {
        return (
          <QuestionGroup
            card={q}
            index={index + 1}
            isFinish={isFinish}
            isHide={isHide}
            answers={answers}
            onChange={(id, ans) => handleSelect(id, ans)} />
        );
      }
    })}
  </>
}