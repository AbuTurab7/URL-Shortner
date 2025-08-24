import { client } from "../config/db-client.js";
import { env } from "../config/env.js";


const db = client.db(env.MONGODB_DATABASE_NAME);
const URL_Collection = db.collection("URL_Shortner");

export async function getLinks() {
  return await URL_Collection.find().toArray();
}

export async function saveToFile(Links) {
  return await URL_Collection.insertOne(Links);
}

export async function getShortLinks(shortCode) {
  return await URL_Collection.findOne({ shortCode : shortCode });
}
