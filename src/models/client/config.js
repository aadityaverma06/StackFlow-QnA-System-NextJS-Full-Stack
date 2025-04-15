import { Client, Account, Avatars, Databases, Storage } from "appwrite";
import env from "@/env.js";

const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, avatars, databases, storage };
