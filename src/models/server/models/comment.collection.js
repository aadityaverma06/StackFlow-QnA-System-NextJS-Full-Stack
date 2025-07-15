import { db, commentCollection } from "../../collectionNames.js";
import { databases } from "../config.js";
import { Permission } from "node-appwrite";

export default async function createcommentCollection() {
  await databases.createCollection(db, commentCollection, commentCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);

  console.log("Comment Collection Created");

  await databases.createStringAttribute(
    db,
    commentCollection,
    "content",
    10000,
    true
  );
  await databases.createEnumAttribute(
    db,
    commentCollection,
    "type",
    ["answer", "question"],
    true
  );
  await databases.createStringAttribute(
    db,
    commentCollection,
    "typeId",
    50,
    true
  );
  await databases.createStringAttribute(
    db,
    commentCollection,
    "authorId",
    50,
    true
  );

  console.log("Comment Collection Attributes Created");
}
