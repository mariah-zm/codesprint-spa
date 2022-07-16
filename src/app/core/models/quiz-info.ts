export class QuizInfo {
    name!: string;
    slug!: string;
    description!: string;
    passingScore!: number;
    showCorrect!: boolean;
    msgSuccess!: boolean;
    msgFailure!: boolean;

    constructor(init?: Partial<QuizInfo>) {
        Object.assign(this, init);
    }
}