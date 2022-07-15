export class QuizResult {
    passed!: boolean;
    msg!: string;
    score!: number;

    constructor(passed: boolean, msg: string, score: number) {
        this.passed = passed;
        this.msg = msg;
        this.score = score;
    }
}