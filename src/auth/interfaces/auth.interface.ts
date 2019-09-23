export interface ILogin {
    access_token: string;
    id: number;
    status: number;
}

export interface IValidate {
    userId: number;
    email: string;
}
