import { MongoClient } from "mongodb";
import {env} from "./env.js"

export const client = new MongoClient(env.MONGODB_URL);

 