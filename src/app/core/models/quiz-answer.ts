export class QuizAnswer {
    answer!: string;
    score!: number;
    isCorrect!: boolean;

    constructor(init?: Partial<QuizAnswer>) {
        Object.assign(this, init);
    }

    setValues(answer: string, score: number, isCorrect: boolean): QuizAnswer {
        this.answer = answer;
        this.score = score;
        this.isCorrect = isCorrect;

        return this;
    }
}