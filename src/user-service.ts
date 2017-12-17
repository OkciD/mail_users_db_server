import * as PgPromise from "pg-promise";
import User from "./user";
import EngagedUsers from "./engaged-users";

export default class UserService {
    private pgPromise: PgPromise.IMain;
    private database: PgPromise.IDatabase<any>;
    private readonly databaseName: string = "mail_users_db";
    private readonly username: string = "mail_users_db_user";
    private readonly password: string = "mail.ru";
    private engagedUsers: EngagedUsers;

    constructor() {
        const initOptions = {
            error: (error) => {
                console.log(`Error: ${error}`);
            }
        };
        this.pgPromise = PgPromise(initOptions);
        this.database = this.pgPromise(`postgres://${this.username}:${this.password}@localhost:5432/${this.databaseName}`);
        this.engagedUsers = new EngagedUsers();
    }

    public getUser(): Promise<User> {
        let whereStatement: string = (this.engagedUsers.isEmpty()) ? "" :
            `WHERE "user".id NOT IN (${this.engagedUsers.getIdsString()})`;

        return this.database.oneOrNone(`SELECT * FROM "user" ${whereStatement} ORDER BY random() LIMIT 1;`)
            .then((user: User) => {
                if (!user) {
                    throw "All users are in use"
                }
                this.engagedUsers.addUser(user.id);
                return user;
            });
    }

    public freeUser(userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.engagedUsers.freeUser(userId)) {
                resolve();
            } else {
                reject();
            }
        });
    }
}