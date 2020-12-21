import { User } from './user.model';

export class Auth {
    status: number;
    message: string;
    token: string;
    expiryInSec: string;
    user: User;

    constructor(auth) {
        this.status = auth.status;
        this.message = auth.message;
        this.token = auth.token;
        this.expiryInSec = auth.expiryInSec;
    }
}