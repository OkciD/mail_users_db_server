class InfoMessage {
    public message: string;

    constructor(message: string) {
        this.message = message;
    }
}

class ErrorMessage {
    private error: string;

    constructor(message: string) {
        this.error = message;
    }
}

export {InfoMessage, ErrorMessage};