import { Document } from "mongoose";

export interface IPendingUser extends Document  {
    name: string;
    email: string;
    phone: string;
    password: string;
    provider: string;
    otp: string | number;
}