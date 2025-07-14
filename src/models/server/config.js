import { Avatars, Client, Databases, Storage, Users } from "node-appwrite";

let client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client);

export { client, databases, avatars, storage, users };
