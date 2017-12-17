import * as Express from "express";
import UserService from "./user-service";

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
        this.app.get("/", (request: Express.Request, response: Express.Response) => {
            response.send("Hello world");
        });
    }
}

new Application();