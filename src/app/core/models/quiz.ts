import { QuizInfo } from "./quiz-info";
import { QuizQuestion } from "./quiz-question";

export class Quiz {
    info!: QuizInfo;
    questions: QuizQuestion[] = [];

    constructor() {
        
    }
}