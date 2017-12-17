import * as PgPromise from "pg-promise";
import User from "./utils/user";
import EngagedUsers from "./engaged-users";
import {ErrorMessage, InfoMessage} from "./utils/messages";

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
                    throw new ErrorMessage("All users are in use");
                }
                this.engagedUsers.addUser(user.id);
                return user;
            });
    }

    public freeUser(userId: number): Promise<InfoMessage | ErrorMessage> {
        return this.engagedUsers.freeUser(userId)
            .then(() => {
                return new InfoMessage(`User #${userId} disengaged`);
            })
            .catch(() => {
                throw new ErrorMessage("User doesn't exist or isn't engaged");
            })
    }

    public freeAll(): Promise<InfoMessage> {
        return this.engagedUsers.freeAll().then(() => {
            return new InfoMessage("All users are free, Daenerys");
        })
    }
}