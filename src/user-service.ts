import * as PgPromise from "pg-promise";
import {Client} from "pg-promise/typescript/pg-subset";

export default class UserService {
    private pgPromise: PgPromise.IMain;
    private database: PgPromise.IDatabase<any>;
    private readonly databaseName: string = "mail_users_db";
    private readonly username: string = "mail_users_db_user";
    private readonly password: string = "mail.ru";

    constructor() {
        const initOptions = {
            connect: (client: Client) => {
                const connectionParameters = client.connectionParameters;
                console.log(`Connected to database: ${connectionParameters.database}`);
            },
            error: (error) => {
                console.log(`Error: ${error}`);
            }
        };
        this.pgPromise = PgPromise(initOptions);
        this.database = this.pgPromise(`postgres://${this.username}:${this.password}@localhost:5432/${this.databaseName}`);
        this.database.one("SELECT 1 AS lol").then((data) => {
            console.log(data.lol);
        });
    }

}