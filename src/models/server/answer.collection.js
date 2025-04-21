import { db, answerCollection } from "../name.js";
import { databases } from "./config.js";
import { Permission } from "node-appwrite";

export default async function createAnswerCollection() {
  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);

  console.log("Answer Collection Created");

  await Promise.all([
    databases.createStringAttribute(
      db,
      answerCollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
      db,
      answerCollection,
      "questionId",
      50,
      true
    ),
    databases.createStringAttribute(
      db,
      answerCollection,
      "authorId",
      50,
      true
    ),
  ]);
  
  console.log("Answer Attributes Created");
}
