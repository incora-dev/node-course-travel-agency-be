export interface ILogin {
    access_token: string;
    user_id: number;
    status: number;
}

export interface IValidate {
    userId: number;
    email: string;
}
