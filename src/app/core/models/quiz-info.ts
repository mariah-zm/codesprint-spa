export class QuizInfo {
    name!: string;
    slug!: string;
    description!: string;
    passingScore!: number;
    showCorrect!: boolean;
    msgFailure!: boolean;
    msgSuccess!: boolean;

    constructor(init?: Partial<QuizInfo>) {
        Object.assign(this, init);
    }
}