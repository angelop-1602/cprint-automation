// src/models/User.ts
export class User {
    username: string;
    role: string;

    constructor(username: string) {
        this.username = username;
        this.role = 'user'; // Default role
    }
}