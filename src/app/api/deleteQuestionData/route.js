import {
  answerCollection,
  commentCollection,
  db,
  questionAttachmentBucket,
  questionCollection,
  voteCollection,
} from "@/models/collectionNames";
import { databases, storage, users } from "@/models/server/config";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { questionId, answerList, userId, imageId } = body;
    let loggedInUserAnswersInQuestion = -1;
    let loggedInUserReputation = -1;

    if (answerList.length > 0) {
      const deleteQuestionAnswersComments = await databases.deleteDocuments(
        db,
        commentCollection,
        [
          Query.equal("type", "answer"),
          Query.equal(
            "typeId",
            answerList.map((answer) => answer.$id)
          ),
        ]
      );

      const deleteQuestionAnswersVotes = await databases.deleteDocuments(
        db,
        voteCollection,
        [
          Query.equal("type", "answer"),
          Query.equal(
            "typeId",
            answerList.map((answer) => answer.$id)
          ),
        ]
      );

      const deleteQuestionAnswers = await databases.deleteDocuments(
        db,
        answerCollection,
        [Query.equal("questionId", questionId)]
      );

      const authorsOfAnswers = answerList
        .filter((answer) => answer.questionId === questionId)
        .map((answer) => answer.authorId);

      const repDecrementCountForAuthors = {};
      for (const author of authorsOfAnswers) {
        if (repDecrementCountForAuthors[author]) {
          repDecrementCountForAuthors[author] += 1;
        } else {
          repDecrementCountForAuthors[author] = 1;
        }
      }

      if (repDecrementCountForAuthors[userId]) {
        const userPrefs = await users.getPrefs(userId);
        loggedInUserReputation = Number(
          userPrefs.reputation - repDecrementCountForAuthors[userId]
        );
      }

      authorsOfAnswers.forEach(async (authorId) => {
        const prefs = await users.getPrefs(authorId);
        await users.updatePrefs(authorId, {
          reputation:
            Number(prefs.reputation) - repDecrementCountForAuthors[authorId],
        });
      });

      loggedInUserAnswersInQuestion = answerList.filter(
        (answer) =>
          answer.authorId === userId && answer.questionId === questionId
      ).length;
    }

    const deleteQuestionVotes = await databases.deleteDocuments(
      db,
      voteCollection,
      [Query.equal("type", "question"), Query.equal("typeId", questionId)]
    );

    const deleteQuestionComments = await databases.deleteDocuments(
      db,
      commentCollection,
      [Query.equal("type", "question"), Query.equal("typeId", questionId)]
    );

    if (imageId) {
      const deleteQuestionImage = await storage.deleteFile(
        questionAttachmentBucket,
        imageId
      );
    }
    const deleteQuestion = await databases.deleteDocument(
      db,
      questionCollection,
      questionId
    );

    return NextResponse.json({
      status: 200,
      message: "Question Deleted Successfully",
      reputation: Number(loggedInUserReputation),
      answersGiven: Number(loggedInUserAnswersInQuestion),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
