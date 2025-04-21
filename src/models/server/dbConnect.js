import { db } from "../name.js";
import createAnswerCollection from "./answer.collection.js";
import createCommentCollection from "./comment.collection.js";
import createQuestionCollection from "./question.collection.js";
import createVoteCollection from "./vote.collection.js";

import { databases } from "./config.js";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("Database Connection");
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("Database Created");
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("Collection created");
      console.log("Database connected");
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }

  return databases;
}
