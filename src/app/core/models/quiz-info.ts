export class QuizInfo {
    name!: string;
    slug!: string;
    description!: string;
    passingScore!: number;
    showCorrect!: boolean;
    msgFail!: boolean;
    msgSuccess!: boolean;

    constructor(init?: Partial<QuizInfo>) {
        Object.assign(this, init);
    }
}