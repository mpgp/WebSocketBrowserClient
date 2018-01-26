export interface User {
    Id: number;
    Login: string;
    Password: string;
}

export interface TokenValidation {
    status: number;
}

export interface UserToken {
    token: string;
}
