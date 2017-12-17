import * as Express from "express";
import UserService from "./user-service";
import User from "./utils/user";
import * as BodyParser from "body-parser";
import {ErrorMessage, InfoMessage} from "./utils/messages";

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
        this.app.delete("/freeall", this.freeAllController.bind(this));
    }

    private getUserController(request: Express.Request, response: Express.Response): void {
        this.usersService.getUser()
            .then((user: User) => {
                response.status(200).send(JSON.stringify(user));
            })
            .catch((errorMessage: ErrorMessage) => {
                response.status(404).send(JSON.stringify(errorMessage));
            });
    }

    private freeUserController(request: Express.Request, response: Express.Response): void {
        let userId: number = +request.body.id;
        this.usersService.freeUser(userId)
            .then((infoMessage: InfoMessage) => {
                response.status(200).send(JSON.stringify(infoMessage));
            })
            .catch((errorMessage: ErrorMessage) => {
                response.status(404).send(JSON.stringify(errorMessage));
            })
    }

    private freeAllController(request: Express.Request, response: Express.Response): void {
        this.usersService.freeAll().then((infoMessage: InfoMessage) => {
            response.status(200).send(JSON.stringify(infoMessage));
        })
    }
}

new Application();