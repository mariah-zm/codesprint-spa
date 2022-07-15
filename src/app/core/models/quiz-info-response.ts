export class QuizInfoResponse {
    id!: number;
    name!: string;
    description!: string;
    amountQuestions!: number;

    constructor(id: number, name: string, desc: string, numQues: number) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.amountQuestions = numQues;
    }
}