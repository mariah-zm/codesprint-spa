export class Quiz {
    name!: string;
    slug!: string;
    description!: string;
    passingScore!: number;
    showCorrect!: boolean;
    msgFail!: boolean;
    msgSuccess!: boolean;

    constructor(init?: Partial<Quiz>) {
        Object.assign(this, init);
    }
}