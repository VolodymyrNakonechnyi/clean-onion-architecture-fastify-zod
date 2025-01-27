import { type Mongoose, connect } from "mongoose";

export const initDB = async (url: string): Promise<Mongoose> => {
    return await connect(url);
}