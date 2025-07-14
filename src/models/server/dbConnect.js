import { db } from "../collectionNames.js";
import createAnswerCollection from "./models/answer.collection.js";
import createCommentCollection from "./models/comment.collection.js";
import createQuestionCollection from "./models/question.collection.js";
import createVoteCollection from "./models/vote.collection.js";

import { databases } from "./config.js";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("Database Connection");
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("Database Created");
      await createQuestionCollection();
      await createAnswerCollection();
      await createCommentCollection();
      await createVoteCollection();
      console.log("Collections created");
      console.log("Database connected");
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }

  return databases;
}
