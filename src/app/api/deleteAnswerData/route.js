import {
  answerCollection,
  commentCollection,
  db,
  voteCollection,
} from "@/models/collectionNames";
import { databases, users } from "@/models/server/config";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { answerId, authorId } = body;

    const deleteAnswerComments = await databases.deleteDocuments(
      db,
      commentCollection,
      [Query.equal("type", "answer"), Query.equal("typeId", answerId)]
    );

    const deleteAnswerVotes = await databases.deleteDocuments(
      db,
      voteCollection,
      [Query.equal("type", "answer"), Query.equal("typeId", answerId)]
    );

    const deleteAnswer = await databases.deleteDocument(
      db,
      answerCollection,
      answerId
    );

    const prefs = await users.getPrefs(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation - 1),
    });

    return NextResponse.json({ prefs, success: true, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
