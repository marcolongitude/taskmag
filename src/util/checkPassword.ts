import bcrypt from "bcryptjs";

export default function checkPassword(
    oldPassword: string,
    password_hash: string
) {
    return bcrypt.compare(oldPassword, password_hash);
}
