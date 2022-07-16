export class QuizAnswer {
    answer!: string;
    score!: number;
    correct!: boolean;

    constructor(answer: string, score: number, isCorrect: boolean) {
        this.answer = answer;
        this.score = score;
        this.correct = isCorrect;
    }

    updateValues(answer: string, score: number, isCorrect: boolean): QuizAnswer {
        this.answer = answer;
        this.score = score;
        this.correct = isCorrect;

        return this;
    }

    isEmpty(): boolean {
        return this.answer === "" || this.answer == undefined;
    }
}