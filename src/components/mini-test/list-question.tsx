import { MiniTestCardItem, UserAnswerList } from "@/types/exam";
import { flattenCards, isCorrectAnswer } from "./utils";



export const ListQuestion = ({ cards, answers, isFinish }: { cards: MiniTestCardItem[], answers: UserAnswerList, isFinish: boolean }) => {

  return <div className='py-5 px-2 rounded-lg shadow text-center bg-white col-span-2 min-h-[444px] w-[295px] relative overflow-hidden' style={{
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  }}>
    <div className="text-base font-semibold text-indigo-600 mb-2">LIST QUESTION</div>
    {/* Question Navigator */}
    <div className="p-4">
      <div className="grid grid-cols-5 gap-2">
        {flattenCards(cards).map((card, index) => {
          return (
            <button
              key={card.id}
              onClick={() => {
                const el = document.getElementById(`question-${card.index}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`w-10 h-10 text-xs rounded-full border text-center ${isFinish ? isCorrectAnswer(card, answers?.[card.id]) ? 'bg-success-300' : 'bg-error-400' : (answers?.[card.id] ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600')} `}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </div>
  </div>
}