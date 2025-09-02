import { databases } from "@/models/client/config";
import { db } from "@/models/collectionNames";
import { Query } from "appwrite";

async function getPaginatedData(
  page,
  limit,
  collection,
  authorId,
  voteType,
  searchParameters
) {
  const offset = (page - 1) * limit;
  let queries = [];

  console.log(searchParameters);

  authorId
    ? (queries = [
        collection === "votes"
          ? Query.equal("votedById", authorId)
          : Query.equal("authorId", authorId),
        Query.limit(limit),
        Query.offset(offset),
      ])
    : (queries = [Query.limit(limit), Query.offset(offset)]);

  if (searchParameters) queries.push(Query.search("title", searchParameters));

  if (voteType === "upvotes")
    queries.push(Query.equal("voteStatus", "upvoted"));
  if (voteType === "downvotes")
    queries.push(Query.equal("voteStatus", "downvoted"));

  try {
    const response = await databases.listDocuments(db, collection, queries);

    return { status: "success", response };
  } catch (error) {
    return { status: "failed", error };
  }
}

export default getPaginatedData;
