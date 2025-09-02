import React, { useState, useEffect } from "react";
import {
  IconCaretUpFilled,
  IconCaretDownFilled,
  IconCaretUp,
  IconCaretDown,
} from "@tabler/icons-react";
import { avatars, databases } from "@/models/client/config";
import MDEditor from "@uiw/react-md-editor";
import { useAuthStore } from "@/store/Auth";
import {
  commentCollection,
  db,
  voteCollection,
} from "@/models/collectionNames";
import { ID, Query } from "appwrite";
import toast from "react-hot-toast";
import dateFormatter from "@/utils/dateFormatter";
import useUserListStore from "@/store/UserList";
import useAnswerDataStore from "@/store/AnswerData";
import CommentEditAndDelete from "./CommentEditAndDelete";
import AnswerEditAndDelete from "./AnswerEditAndDelete";

function AnswerContainer({
  authorId,
  content,
  id,
  comments,
  createdAt,
  questionAuthorId,
}) {
  const { usersList } = useUserListStore();
  const { answerAuthorReputation, setAnswerCommentSubmit } =
    useAnswerDataStore();
  const [answerComment, setAnswerComment] = useState("");
  const { user } = useAuthStore();
  const users = usersList.find((user) => user.$id === authorId);
  const authorAvatar = avatars.getInitials(users.name, 45, 45);
  const authorAvatarmd = avatars.getInitials(users.name, 30, 30);
  const authorName = users.name;
  const [totalVotes, setTotalVotes] = useState(null);
  const [voteStatus, setVoteStatus] = useState("");
  let authorReputation;
  if (user?.$id === authorId) {
    if (answerAuthorReputation) {
      authorReputation = answerAuthorReputation;
    } else {
      authorReputation = users.prefs.reputation;
    }
  } else {
    authorReputation = users.prefs.reputation;
  }

  const [answerVoteSubmit, setAnswerVoteSubmit] = useState(false);
  async function handleAnswerComment() {
    if (!user) return;
    if (!answerComment) {
      toast.error("Answer Comment cannot be empty");
      return;
    }
    try {
      const createAnswerComment = await databases.createDocument(
        db,
        commentCollection,
        ID.unique(),
        {
          content: answerComment,
          type: "answer",
          typeId: id,
          authorId: user.$id,
        }
      );
      setAnswerCommentSubmit((prev) => !prev);
      setAnswerComment("");
      toast.success("Answer Comment Added Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (!user) return;
    async function getCurrentAnswerVoteStatus() {
      const currentAnswerVote = await databases.listDocuments(
        db,
        voteCollection,
        [
          Query.equal("typeId", id),
          Query.equal("type", "answer"),
          Query.equal("votedById", user.$id),
          Query.limit(1),
        ]
      );
      if (
        currentAnswerVote.total > 0 &&
        currentAnswerVote.documents[0].voteStatus == "upvoted"
      ) {
        setVoteStatus("upvoted");
      }
      if (
        currentAnswerVote.total > 0 &&
        currentAnswerVote.documents[0].voteStatus == "downvoted"
      ) {
        setVoteStatus("downvoted");
      }
      if (currentAnswerVote.total === 0) {
        setVoteStatus("notvoted");
      }
    }
    getCurrentAnswerVoteStatus();
  }, []);
  useEffect(() => {
    async function getAnswerVotes() {
      try {
        const [upvotes, downvotes] = await Promise.all([
          databases.listDocuments(db, voteCollection, [
            Query.equal("typeId", id),
            Query.equal("type", "answer"),
            Query.equal("voteStatus", "upvoted"),
            Query.limit(1),
          ]),
          databases.listDocuments(db, voteCollection, [
            Query.equal("typeId", id),
            Query.equal("type", "answer"),
            Query.equal("voteStatus", "downvoted"),
            Query.limit(1),
          ]),
        ]);
        setTotalVotes(upvotes.total - downvotes.documents.length);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getAnswerVotes();
  }, [answerVoteSubmit]);

  async function handleAnswerUpvote() {
    if (!user) return;
    try {
      const isUpvoteExisting = await databases.listDocuments(
        db,
        voteCollection,
        [
          Query.equal("typeId", id),
          Query.equal("type", "answer"),
          Query.equal("voteStatus", "upvoted"),
          Query.equal("votedById", user.$id),
        ]
      );
      if (isUpvoteExisting.total > 0) {
        const deleteUpvote = await databases.deleteDocument(
          db,
          voteCollection,
          isUpvoteExisting.documents[0].$id
        );
        setAnswerVoteSubmit((prev) => !prev);
        setVoteStatus("notvoted");
        toast.error("Answer Upvote Deleted Successfully");
        return;
      }
      const isDownvoteExisting = await databases.listDocuments(
        db,
        voteCollection,
        [
          Query.equal("typeId", id),
          Query.equal("type", "answer"),
          Query.equal("voteStatus", "downvoted"),
          Query.equal("votedById", user.$id),
        ]
      );
      if (isDownvoteExisting.total > 0) {
        const deleteDownvote = await databases.deleteDocument(
          db,
          voteCollection,
          isDownvoteExisting.documents[0].$id
        );
        setAnswerVoteSubmit((prev) => !prev);
        setVoteStatus("notvoted");
        toast.error("Answer Downvote Deleted Successfully");
      }
      const createUpvote = await databases.createDocument(
        db,
        voteCollection,
        ID.unique(),
        {
          type: "answer",
          typeId: id,
          voteStatus: "upvoted",
          votedById: user.$id,
        }
      );
      setAnswerVoteSubmit((prev) => !prev);
      setVoteStatus("upvoted");
      toast.success("Answer Upvoted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleAnswerDownvote() {
    if (!user) return;
    try {
      const isDownvoteExisting = await databases.listDocuments(
        db,
        voteCollection,
        [
          Query.equal("typeId", id),
          Query.equal("type", "answer"),
          Query.equal("voteStatus", "downvoted"),
          Query.equal("votedById", user.$id),
        ]
      );
      if (isDownvoteExisting.total > 0) {
        const deleteUpvote = await databases.deleteDocument(
          db,
          voteCollection,
          isDownvoteExisting.documents[0].$id
        );
        setAnswerVoteSubmit((prev) => !prev);
        setVoteStatus("notvoted");
        toast.error("Answer Downvote Deleted Successfully");
        return;
      }
      const isUpvoteExisting = await databases.listDocuments(
        db,
        voteCollection,
        [
          Query.equal("typeId", id),
          Query.equal("type", "answer"),
          Query.equal("voteStatus", "upvoted"),
          Query.equal("votedById", user.$id),
        ]
      );
      if (isUpvoteExisting.total > 0) {
        const deleteUpvote = await databases.deleteDocument(
          db,
          voteCollection,
          isUpvoteExisting.documents[0].$id
        );
        setAnswerVoteSubmit((prev) => !prev);
        setVoteStatus("notvoted");
        toast.error("Answer Upvote Deleted Successfully");
      }
      const createDownvote = await databases.createDocument(
        db,
        voteCollection,
        ID.unique(),
        {
          type: "answer",
          typeId: id,
          voteStatus: "downvoted",
          votedById: user.$id,
        }
      );
      setAnswerVoteSubmit((prev) => !prev);
      setVoteStatus("downvoted");
      toast.success("Answer Downvoted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="grid grid-cols-[4%_1fr] grid-rows-[max-content_max-content_max-content_max-content_max-content_max-content] gap-y-4 gap-x-2 xs:gap-4 pb-2 pt-4 border-t-2 border-zinc-700">
      <div className="col-start-1 row-span-3 flex flex-col items-center gap-2 md:gap-4">
        <button
          className={`rounded-full hover:bg-gray-800 transition duration-100 border-2 border-gray-500 w-max cursor-pointer p-1 opacity-70 hover:opacity-100 ${
            voteStatus === "upvoted"
              ? "opacity-100 bg-gray-800 hover:bg-gray-900"
              : "opacity-70"
          }`}
          onClick={handleAnswerUpvote}
        >
          {voteStatus === "upvoted" ? (
            <div>
              <IconCaretUpFilled size={30} className="hidden md:block" />
              <IconCaretUpFilled
                size={20}
                className="hidden xs:block md:hidden"
              />
              <IconCaretUpFilled size={10} className="block xs:hidden" />
            </div>
          ) : (
            <div>
              <IconCaretUp size={30} className="hidden md:block" />
              <IconCaretUp size={20} className="hidden xs:block md:hidden" />
              <IconCaretUp size={10} className="block xs:hidden" />
            </div>
          )}
        </button>
        <p className="text-xs xs:text-sm md:text-lg text-purple-500">
          {totalVotes}
        </p>
        <button
          className={`rounded-full hover:bg-gray-800 transition duration-100 border-2 border-gray-500 w-max cursor-pointer p-1 opacity-70 hover:opacity-100 ${
            voteStatus === "downvoted"
              ? "opacity-100 bg-gray-800 hover:bg-gray-900"
              : "opacity-70"
          }`}
          onClick={handleAnswerDownvote}
        >
          {voteStatus === "downvoted" ? (
            <div>
              <IconCaretDownFilled size={30} className="hidden md:block" />
              <IconCaretDownFilled
                size={20}
                className="hidden xs:block md:hidden"
              />
              <IconCaretDownFilled size={10} className="block xs:hidden" />
            </div>
          ) : (
            <div>
              <IconCaretDown size={30} className="hidden md:block" />
              <IconCaretDown size={20} className="hidden xs:block md:hidden" />
              <IconCaretDown size={10} className="block xs:hidden" />
            </div>
          )}
        </button>
      </div>
      <AnswerEditAndDelete
        content={content}
        id={id}
        authorId={authorId}
        questionAuthorId={questionAuthorId}
      />
      <div className="col-start-2 row-start-2 grid grid-cols-[max-content_max-content] grid-rows-[max-content_max-content] gap-x-2 justify-end">
        <div className="col-start-1 row-span-2">
          <img
            src={authorAvatar}
            alt="Avatar"
            className="hidden md:block rounded-sm"
          />
          <img
            src={authorAvatarmd}
            alt="Avatar"
            className="rounded-sm block md:hidden"
          />
        </div>
        <p className="text-xs md:text-base col-start-2 row-start-1 text-orange-400">
          {authorName}
        </p>
        <p className="text-sm md:text-base col-start-2 row-start-2 ">
          Rep: <span className="text-purple-500">{authorReputation}</span>
        </p>
      </div>

      <div className="col-start-2 row-start-3 flex justify-end py-2 border-y-2">
        <p className="text-xs md:text-base lg:text-lg text-yellow-300">{`asked ${dateFormatter(
          createdAt
        )}`}</p>
      </div>
      <div className="col-start-2 row-start-4">
        <p className="text-lg md:text-2xl text-[#FF5349]">
          {comments.length === 0
            ? "No Comments"
            : comments.length === 1
            ? "1 Comment"
            : `${comments.length} Comments`}
        </p>
      </div>
      <div className="col-start-2 row-start-5 flex flex-col gap-2">
        {comments.map((comment, index) => (
          <div key={index} className="border-y-2">
            <CommentEditAndDelete comment={comment} type="answer" />
          </div>
        ))}
      </div>
      <div className="col-start-2 row-start-6 border-b-2 border-t-2 flex flex-col sm:grid sm:grid-cols-[85%_1fr] gap-2 border-y-2 border-zinc-700 py-2 sm:py-4">
        {user ? (
          <>
            <textarea
              className="p-2 rounded-lg bg-[#080d1a] z-20 border border-zinc-700 text-xs md:text-base"
              placeholder="Add a comment..."
              rows="1"
              value={answerComment}
              onChange={(e) => setAnswerComment(e.target.value)}
            ></textarea>
            <button
              className="col-start-2 rounded-lg text-xs sm:text-sm md:text-lg bg-amber-600 hover:bg-amber-700 font-bold cursor-pointer max-h-max p-2 text-white z-30 transition duration-200 w-max sm:w-auto "
              onClick={handleAnswerComment}
            >
              Add Comment
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center col-span-2">
              <h2
                className="text-base md:text-xl text-red-400 text-center border-4 rounded-xl px-4 py-2 border-gray-700 hover:text-red-500 transition duration-200 cursor-pointer"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login to comment on Answers
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AnswerContainer;
