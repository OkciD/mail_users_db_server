import * as Express from "express";
import UserService from "./user-service";
import User from "./user";
import * as BodyParser from "body-parser";

class Application {
    private app: Express.Application;
    private port: number = 5000;
    private usersService: UserService;

    constructor() {
        this.app = Express();
        this.app.use(BodyParser.json());
        this.configureRoutes();
        this.usersService = new UserService();
        this.app.listen(this.port, () => {
            console.log(`Server listening port ${this.port}`);
        });
    }

    private configureRoutes(): void {
        this.app.get("/getuser", this.getUserController.bind(this));
        this.app.delete("/freeuser", this.freeUserController.bind(this));
    }

    private getUserController(request: Express.Request, response: Express.Response): void {
        this.usersService.getUser()
            .then((user: User) => {
                response.status(200).send(JSON.stringify(user));
            })
            .catch((error: string) => {
                response.status(404).send(JSON.stringify({error}));
            });
    }

    private freeUserController(request: Express.Request, response: Express.Response): void {
        let userId: number = +request.body.id;
        this.usersService.freeUser(userId)
            .then(() => {
                response.status(200).send();
            })
            .catch(() => {
                response.status(404).send();
            })
    }
}

new Application();