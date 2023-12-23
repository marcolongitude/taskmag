export interface IUser {
    id_users: string;
    name_users: string;
    email_users: string;
    permission: "super" | "admin" | "comum";
    password_hash?: string;
    password?: string;
}

