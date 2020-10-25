import { AccountType } from "src/enums/AccountType";

export interface IAccount {
    username: string;
    password: string;
    category: AccountType
}