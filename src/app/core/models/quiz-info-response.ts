export class QuizInfoResponse {
    name!: string;
    slug!: string;
    description!: string;
    amountQuestions!: number;

    constructor(name: string, slug: string, desc: string, numQues: number) {
        this.name = name;
        this.slug = slug;
        this.description = desc;
        this.amountQuestions = numQues;
    }
}