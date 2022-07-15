import { QuestionType } from "./enums/question-type.enum";
import { QuizAnswer } from "./quiz-answer";

export class QuizQuestion {
    question!: string;
    type!: QuestionType;
    answers!: QuizAnswer[];
    correctAnswer!: number;

    constructor(init?: Partial<QuizQuestion>) {
        Object.assign(this, init);
    }
}
