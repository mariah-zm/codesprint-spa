export class QuizResult {
    passed!: boolean;
    msg!: string;
    score!: number;

    constructor() {
        this.passed = true;
        this.msg = "Hooray! You passed."
        this.score = 10;
    }
}