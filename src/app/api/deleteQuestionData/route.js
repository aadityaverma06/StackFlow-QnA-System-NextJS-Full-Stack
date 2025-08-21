import {
  answerCollection,
  commentCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/collectionNames";
import { databases } from "@/models/server/config";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { questionId, answerList } = body;
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

    const deleteQuestionVotes = await databases.deleteDocuments(
      db,
      voteCollection,
      [Query.equal("type", "question"), Query.equal("typeId", questionId)]
    );

    const deleteQuestionAnswers = await databases.deleteDocuments(
      db,
      answerCollection,
      [Query.equal("questionId", questionId)]
    );

    const deleteQuestionComments = await databases.deleteDocuments(
      db,
      commentCollection,
      [Query.equal("type", "question"), Query.equal("typeId", questionId)]
    );

    const deleteQuestion = await databases.deleteDocument(
      db,
      questionCollection,
      questionId
    );
    return NextResponse.json({
      status: 200,
      message: "Question Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
