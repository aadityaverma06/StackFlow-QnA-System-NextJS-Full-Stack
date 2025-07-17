import { Permission } from "node-appwrite";
import { db, voteCollection } from "../../collectionNames";
import { databases } from "../config";

export default async function createVoteCollection() {
  await databases.createCollection(db, voteCollection, voteCollection, [
    Permission.create("users"),
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);

  console.log("Vote Collection Created");

  await databases.createEnumAttribute(
    db,
    voteCollection,
    "type",
    ["question", "answer"],
    true
  ),
    await databases.createStringAttribute(
      db,
      voteCollection,
      "typeId",
      50,
      true
    ),
    await databases.createEnumAttribute(
      db,
      voteCollection,
      "voteStatus",
      ["upvoted", "downvoted"],
      true
    ),
    await databases.createStringAttribute(
      db,
      voteCollection,
      "votedById",
      50,
      true
    ),
    console.log("Vote Attributes Created");
}
