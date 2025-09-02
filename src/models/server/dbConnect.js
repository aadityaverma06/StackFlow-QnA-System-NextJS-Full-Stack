import { db } from "../collectionNames.js";
import createAnswerCollection from "./collections/answer.collection.js";
import createCommentCollection from "./collections/comment.collection.js";
import createQuestionCollection from "./collections/question.collection.js";
import createVoteCollection from "./collections/vote.collection.js";

import { databases } from "./config.js";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("Database Connected");
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("Database Created");
      await createAnswerCollection();
      await createCommentCollection();
      await createVoteCollection();
      await createQuestionCollection();
      console.log("Collections created");
      console.log("Database connected");
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }

  return databases;
}
