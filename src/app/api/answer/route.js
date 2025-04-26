import { answerCollection, db } from "@/models/name";
import { databases } from "@/models/server/config";
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
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
