import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request) {
  try {
    const body = await request.json();
    const { questionId, answer, authorId } = body;
    const response = databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        questionId: questionId,
        authorId: authorId,
      }
    );
    const prefs = await users.getPrefs(authorId);
    await users.updatePrefs({
      reputation: Number(prefs.reputation + 1),
    });
    return NextResponse.json({ response, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { answerId } = body;

    const answer = await databases.getDocument(db, answerCollection, answerId);

    const response = await databases.deleteDocument(
      db,
      answerCollection,
      answerId
    );

    const prefs = await users.getPrefs(answer.authorId);
    await users.updatePrefs({
      reputation: Number(prefs.reputation - 1),
    });

    return NextResponse.json({ response, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
