import { QuizQuestion } from "./quiz-question";

export class QuizResponse {
    name!: string;
    questions!: QuizQuestion[];
    passingScore!: number;
    msgSuccess!: string;
    msgFail!: string;
    showCorrect!: boolean;

    constructor() {
        this.name = "";
        this.questions = [];
        this.passingScore = 0;
        this.msgSuccess = ""
        this.msgFail = "";
        this.showCorrect = false;
    }
}