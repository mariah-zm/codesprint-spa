import { QuestionType } from "./enums/question-type.enum";
import { QuizAnswer } from "./quiz-answer";
import { QuizQuestion } from "./quiz-question";

export class QuizResponse {
    name!: string;
    questions!: QuizQuestion[];
    passingScore!: number;
    msgSuccess!: string;
    msgFail!: string;
    showCorrect!: boolean;

    constructor() {
        this.name = "Maths Quiz";

        const que1ans1 = new QuizAnswer("2", 1, true);
        const que1ans2 = new QuizAnswer("1", 0, false);

        const que2ans1 = new QuizAnswer("1", 1, true);
        const que2ans2 = new QuizAnswer("2", 0, false);
        const que2ans3 = new QuizAnswer("3", 1, true);

        const que3ans1 = new QuizAnswer("True", 1, true);
        const que3ans2 = new QuizAnswer("False", 0, false);

        this.questions = [
            new QuizQuestion(
                "What is 1 + 1?",
                QuestionType.SingleChoice,
                [ que1ans1, que1ans2 ]
            ),
            new QuizQuestion(
                "Which of these numbers are odd?",
                QuestionType.MultipleChoice,
                [ que2ans1, que2ans2, que2ans3 ]
            ),
            new QuizQuestion(
                "Is 5-3=2?",
                QuestionType.TrueFalse,
                [ que3ans1, que3ans2]
            )

        ];

        this.passingScore = 2;
        this.msgSuccess = "Yay! You passed the Quiz."
        this.msgFail = "Boo! You did not pass the Quiz.";
        this.showCorrect = false;
    }
}