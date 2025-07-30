import { db, questionCollection } from "../../collectionNames.js";
import { databases } from "../config.js";
import { IndexType, Permission } from "node-appwrite";

export default async function createQuestionCollection() {
  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);

  console.log("Question Collection Created");

  await databases.createStringAttribute(
    db,
    questionCollection,
    "title",
    100,
    true
  );
  await databases.createStringAttribute(
    db,
    questionCollection,
    "content",
    10000,
    true
  );
  await databases.createStringAttribute(
    db,
    questionCollection,
    "authorId",
    50,
    true
  );
  await databases.createStringAttribute(
    db,
    questionCollection,
    "tags",
    50,
    true,
    undefined,
    true
  );
  await databases.createStringAttribute(
    db,
    questionCollection,
    "Image",
    50,
    false
  );
  console.log("Question Attributes Created");

  await databases.createIndex(
    db,
    questionCollection,
    "title",
    IndexType.Fulltext,
    ["title"],
    ["asc"]
  );
  await databases.createIndex(
    db,
    questionCollection,
    "content",
    IndexType.Fulltext,
    ["content"],
    ["asc"]
  ),
    console.log("Question Indexes Created");
}
