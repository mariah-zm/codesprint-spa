import { RoleType } from "./enums/role.enum";

export class User {
    email!: string;
    name!: string;
    role!: RoleType;

    constructor () {
        this.email = "";
        this.name = "";
        this.role = RoleType.NONE;
    }
}