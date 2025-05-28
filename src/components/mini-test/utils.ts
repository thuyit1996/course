import { MiniTestCardItem, MiniTestChoiceItem, MiniTestQuestionItem, UserAnswerList } from "@/types/exam";
import { v4 } from 'uuid';

export function flattenCards(cards: MiniTestCardItem[]): MiniTestQuestionItem[] {
  const result: MiniTestQuestionItem[] = [];
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (card.isQuestionGroup && Array.isArray(card.childCards)) {
      for (let x = 0; x < card.childCards.length; x++) {
        const childCard = card.childCards[x];
        result.push({
          ...childCard,
          index: `${i + 1}-${x + 1}`
        });
      }

    } else {
      result.push({
        ...card,
        index: String(i + 1)
      });
    }

  }

  return result;
}

export const getCorrectAnswer = (props: {
  choices?: MiniTestChoiceItem[];
  text?: string;
}) => {
  if (props?.choices) {
    return props?.choices.find(choice => choice.isCorrect)?.content
  }
  return props?.text ?? ''
}

export const isCorrectAnswer = (card: MiniTestQuestionItem, answer: string) => {
  if (!answer) {
    return false;
  }
  const correctAnswer = getCorrectAnswer(card.answer)
  if (card.answer.text) {
    return areTextsMatching(correctAnswer?.toLowerCase() ?? '', answer.toLowerCase())
  }
  return correctAnswer?.toLowerCase() === answer.toLowerCase();
}

export const getExamScore = (cards: MiniTestCardItem[], answers: UserAnswerList) => {
  let correctAnswer = 0;
  let totalAnswer = 0;
  flattenCards(cards).map(card => {
    totalAnswer++;
    if (isCorrectAnswer(card, answers?.[card.id])) {
      correctAnswer++;
    }
  })
  return Math.floor((correctAnswer / totalAnswer) * 100);
}

export const getListAnswer = (cards: MiniTestCardItem[], answers: UserAnswerList) => {
  const result: Array<string> = [];
  flattenCards(cards).map(card => {
    result.push(answers?.[card.id] ?? '')
  })
  return result
}

export const onGenNewQuestionID = (cards: MiniTestCardItem[]) => {
  const result: MiniTestCardItem[] = cards.map(card => {
    if (card.childCards?.length) {
      return {
        ...card,
        id: v4(),
        childCards: card.childCards.map(childCard => {
          return {
            ...childCard,
            id: v4(),
          }
        })
      }
    }
    return {
      ...card,
      id: v4(),
    }
  });

  return result
}

function normalizeText(text: string) {
  let normalized = text.toLowerCase();

  // 1. Mở rộng các biến thể rút gọn phổ biến
  const contractions = {
    "won't": "will not",
    "can't": "can not",
    "shan't": "shall not",
    "n't": " not",
    "nt": " not", // không dùng với từ gốc như "internet", đơn giản hóa cho demo
    "i'm": "i am",
    "you're": "you are",
    "he's": "he is",
    "she's": "she is",
    "it's": "it is",
    "we're": "we are",
    "they're": "they are",
    "i've": "i have",
    "you've": "you have",
    "we've": "we have",
    "they've": "they have",
    "i'll": "i will",
    "you'll": "you will",
    "he'll": "he will",
    "she'll": "she will",
    "it'll": "it will",
    "we'll": "we will",
    "they'll": "they will",
    "that's": "that is",
    "there's": "there is",
    "what's": "what is",
    "who's": "who is",
    "let's": "let us",
    "didn't": "did not",
    "doesn't": "does not",
    "don't": "do not"
  };

  // Thay thế contraction
  for (const [key, value] of Object.entries(contractions)) {
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    normalized = normalized.replace(regex, value);
  }

  // 2. Loại bỏ dấu câu
  normalized = normalized.replace(/[^a-z\s]/g, '');

  // 3. Chuẩn hóa khoảng trắng
  normalized = normalized.replace(/\s+/g, ' ').trim();

  return normalized;
}

function areTextsMatching(text1: string, text2: string) {
  return normalizeText(text1) === normalizeText(text2);
}