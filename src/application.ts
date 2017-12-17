import * as Express from "express";
import UserService from "./user-service";
import User from "./user";

class Application {
    private app: Express.Application;
    private port: number = 5000;
    private usersService: UserService;

    constructor() {
        this.app = new Express();
        this.configureRoutes();
        this.usersService = new UserService();
        this.app.listen(this.port, () => {
            console.log(`Server listening port ${this.port}`);
        });
    }

    configureRoutes() {
        this.app.get("/getuser", this.getUser.bind(this));
    }

    private getUser(request: Express.Request, response: Express.Response) {
        let getUserPromise: Promise<User | null> = this.usersService.getUser();

        getUserPromise.then((user: User) => {
            response.status(200).send(JSON.stringify(user));
        });
        getUserPromise.catch((error: string) => {
            response.status(404).send(JSON.stringify({error}));
        });
    }
}

new Application();