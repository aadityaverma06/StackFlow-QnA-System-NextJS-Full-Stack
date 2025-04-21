import env from "@/env.js";
import { Avatar, Client, Databases, Storage, Users } from "node-appwrite";

let client = new Client();

client
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)
  .setKey(env.appwrite.apiKey);

const databases = new Databases(client);
const avatars = new Avatar(client);
const storage = new Storage(client);
const users = new Users(client);

export { client, databases, avatars, storage, users };
