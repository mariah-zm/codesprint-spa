import { QuestionType } from "./enums/question-type.enum";
import { QuizAnswer } from "./quiz-answer";

export class QuizQuestion {
    question!: string;
    type!: QuestionType;
    answers!: QuizAnswer[];
    correctAnswer!: number;

    constructor(ques: string, type: QuestionType, ans: QuizAnswer[], correct: number) {
        this.question = ques;
        this.type = type;
        this.answers = ans;
        this.correctAnswer = correct;
    }
}
