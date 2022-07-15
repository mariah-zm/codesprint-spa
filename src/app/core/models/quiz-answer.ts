export class QuizAnswer {
    answer!: string;
    score!: number;

    constructor(init?: Partial<QuizAnswer>) {
        Object.assign(this, init);
    }
}