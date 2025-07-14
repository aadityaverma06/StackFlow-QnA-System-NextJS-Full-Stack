import { voteCollection } from "@/models/collectionNames";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { votedById, voteStatus, type, typeId } = await request.json();

    const response = await databases.listDocuments(db, voteCollection, [
      Query.equal("typeId", typeId),
      Query.equal("type", type),
      Query.equal("votedById", votedById),
    ]);

    if (response.documents.length > 0) {
    }

    if (response.documents[0].voteStatus !== voteStatus) {
    }

    const [upvotes, downvotes] = await Promise.all([
      databases.listDocuments(db, voteCollection, [
        Query.equal("typeId", typeId),
        Query.equal("type", type),
        Query.equal("voteStatus", "upvote"),
        Query.equal("votedById", votedById),
        Query.limit(1),
      ]),
      databases.listDocuments(db, voteCollection, [
        Query.equal("typeId", typeId),
        Query.equal("type", type),
        Query.equal("voteStatus", "downvote"),
        Query.equal("votedById", votedById),
        Query.limit(1),
      ]),
    ]);

    return NextResponse.json({
      data: { document: null, voteresult: upvotes.total - downvotes.total },
      status: 200,
      message: "success",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
