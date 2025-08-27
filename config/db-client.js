// import { MongoClient } from "mongodb";
// import {env} from "./env.js"

// export const client = new MongoClient(env.MONGODB_URL);

 
import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
    try {
        await mongoose.connect(env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}