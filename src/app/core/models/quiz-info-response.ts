export class QuizInfoResponse {
    name!: string;
    slug!: string;
    description!: string;
    amountQuestions!: number;

    constructor() {
        this.name = "";
        this.slug = "";
        this.description = "";
        this.amountQuestions = 0;
    }
}