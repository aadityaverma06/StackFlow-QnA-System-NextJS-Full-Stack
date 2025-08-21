import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, avatars, databases, storage };
