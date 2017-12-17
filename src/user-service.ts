import * as PgPromise from "pg-promise";
import User from "./user";

export default class UserService {
    private pgPromise: PgPromise.IMain;
    private database: PgPromise.IDatabase<any>;
    private readonly databaseName: string = "mail_users_db";
    private readonly username: string = "mail_users_db_user";
    private readonly password: string = "mail.ru";
    private engagedUsersIds: number[];

    constructor() {
        const initOptions = {
            error: (error) => {
                console.log(`Error: ${error}`);
            }
        };
        this.pgPromise = PgPromise(initOptions);
        this.database = this.pgPromise(`postgres://${this.username}:${this.password}@localhost:5432/${this.databaseName}`);
        this.engagedUsersIds = [];
    }

    getUser(): Promise<User> {
        let whereStatement: string = (this.engagedUsersIds.length != 0) ?
            `WHERE "user".id NOT IN (${this.engagedUsersIds.join()})` :
            "";

        return this.database.oneOrNone(`SELECT * FROM "user" ${whereStatement} ORDER BY random() LIMIT 1;`)
            .then((user: User) => {
                if (!user) {
                    throw "All users are in use"
                }
                this.engagedUsersIds.push(user.id);
                return user;
            });
    }
}