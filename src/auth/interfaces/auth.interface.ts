export interface ILogin {
    access_token: string;
    objectId: number;
    status: number;
}

export interface IValidate {
    userId: number;
    email: string;
}
