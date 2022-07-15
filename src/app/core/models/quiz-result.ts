export class QuizResult {
    passed!: boolean;
    msg!: string;
    score!: number;

    constructor() {
        this.passed = false;
        this.msg = "Oh no! You failed."
        this.score = 10;
    }
}