class EngagedUser {
    private _userId: number;
    private _creationTimestamp: number;

    constructor(userId: number) {
        this._userId = userId;
        this._creationTimestamp = Date.now();
    }

    get userId(): number {
        return this._userId;
    }

    get creationTimestamp(): number {
        return this._creationTimestamp;
    }
}

export default class EngagedUsers {
    private engagedUsers: Array<EngagedUser>;
    private readonly timeout: number = 10 * 60 * 1000; // 10 mins
    private readonly timerDelay: number = 60 * 1000; // 1 min
    private intervalId: number;

    constructor() {
        this.engagedUsers = [];
        this.intervalId = setInterval(this.checkExpiredUsers.bind(this), this.timerDelay);
    }

    private checkExpiredUsers(): void {
        this.engagedUsers.forEach((engagedUser: EngagedUser, index: number) => {
           if (Date.now() - engagedUser.creationTimestamp >= this.timeout) {
               this.engagedUsers.splice(index, 1);
           }
        });
    }

    public addUser(userId: number): void {
        this.engagedUsers.push(new EngagedUser(userId));
    }

    public freeUser(userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let index: number = this.engagedUsers.findIndex((currentUser: EngagedUser) => {
                return currentUser.userId === userId;
            });
            if (index > -1) {
                this.engagedUsers.splice(index, 1);
                resolve();
            } else {
                reject();
            }
        });
    }

    public isEmpty(): boolean {
        return this.engagedUsers.length === 0;
    }

    public getIdsString(): string {
        return this.engagedUsers.map((engagedUser: EngagedUser) => {
            return engagedUser.userId;
        }).join();
    }

    public freeAll(): Promise<void> {
        this.engagedUsers = [];
        return Promise.resolve();
    }
}