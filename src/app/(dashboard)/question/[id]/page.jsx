"use client";

import {
  IconCaretUpFilled,
  IconCaretDownFilled,
  IconCaretUp,
  IconCaretDown,
} from "@tabler/icons-react";

import ParticlesBackground from "@/components/custom/ParticlesBackground";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { FloatingDock } from "@/components/ui/floatingDock.jsx";
import { links } from "@/utils/navbarLinks.js";
import { useEffect, useState } from "react";
import AnswerContainer from "@/components/custom/AnswerContainer";
import MarkdownEditor from "@/components/ui/MarkdownEditor.jsx";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { useParams } from "next/navigation";
import {
  answerCollection,
  commentCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/collectionNames";
import toast from "react-hot-toast";
import { avatars, databases } from "@/models/client/config";
import { ID, Query } from "appwrite";
import { useAuthStore } from "@/store/Auth";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import dateFormatter from "@/utils/dateFormatter";
import { useRouter } from "next/navigation";
import useMarkdownEditorValueStore from "@/store/MarkdownEditorValue";
import useUserListStore from "@/store/UserList";
import useAnswerDataStore from "@/store/AnswerData";
import useQuestionCommentDataStore from "@/store/QuestionCommentData";
import CommentEditAndDelete from "@/components/custom/CommentEditAndDelete";
import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
function question() {
  const router = useRouter();
  const [loadParticles, setLoadParticles] = useState(false);
  const params = useParams();
  const id = params.id;
  const [question, setQuestion] = useState(null);
  const [dateFormat, setDateFormat] = useState("");

  const { value, setValue } = useMarkdownEditorValueStore();
  const { answerCommentSubmit, setAnswerAuthorReputation } =
    useAnswerDataStore();
  const { usersList } = useUserListStore();

  const { questionAuthorReputation, setQuestionAuthorReputation } =
    useLoggedInUserDetailsStore();
  const [questionAuthor, setQuestionAuthor] = useState(null);
  const [questionAuthorAvatar, setQuestionAuthorAvatar] = useState(null);
  const [questionAuthorAvatarmd, setQuestionAuthorAvatarmd] = useState(null);
  const [message, setMessage] = useState("Loading...");
  const [questionComment, setQuestionComment] = useState("");
  const { questionCommentSubmit, setQuestionCommentSubmit } =
    useQuestionCommentDataStore();

  const [loadAllQuestionComments, setLoadAllQuestionComments] = useState(null);
  const [loadAllAnswerComments, setLoadAllAnswerComments] = useState(null);
  const [loadAllAnswers, setLoadAllAnswers] = useState(null);
  const { user } = useAuthStore();
  const { answerSubmit, setAnswerSubmit } = useAnswerDataStore();
  const [totalVotes, setTotalVotes] = useState(null);
  const [voteSubmit, setVoteSubmit] = useState(false);
  const [voteStatus, setVoteStatus] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    async function loadQuestion() {
      try {
        const getQuestion = await databases.getDocument(
          db,
          questionCollection,
          id
        );
        setQuestion(getQuestion);
      } catch (error) {
        toast.error(error.message);
        setMessage("Question not found !!");
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev < 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setTimeout(() => {
          router.push("/home");
        }, 2000);

        return () => clearInterval(interval);
      }
    }

    loadQuestion();
  }, []);

  useEffect(() => {
    if (!question) return;
    if (!question.image) setLoadParticles(true);
  }, [question]);

  useEffect(() => {
    if (!question) return;
    let user = null;
    user = usersList.find((user) => user.$id === question.authorId);
    setQuestionAuthorReputation(Number(user.prefs.reputation));
    const userAvatar = avatars.getInitials(user.name, 45, 45);
    const userAvatarmd = avatars.getInitials(user.name, 30, 30);
    setQuestionAuthor(user);
    setQuestionAuthorAvatar(userAvatar);
    setQuestionAuthorAvatarmd(userAvatarmd);
    setDateFormat(dateFormatter(question.$createdAt));
  }, [question]);

  useEffect(() => {
    async function loadQuestionComments() {
      if (!question) return;
      try {
        const getQuestionComments = await databases.listDocuments(
          db,
          commentCollection,
          [Query.equal("type", "question"), Query.equal("typeId", question.$id)]
        );
        setLoadAllQuestionComments(getQuestionComments.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }

    loadQuestionComments();
  }, [question, questionCommentSubmit]);

  async function handleQuestionComment() {
    if (!user) return;
    if (!questionComment) {
      toast.error("Question Comment cannot be empty");
      return;
    }
    try {
      await databases.createDocument(db, commentCollection, ID.unique(), {
        content: questionComment,
        type: "question",
        typeId: question.$id,
        authorId: user.$id,
      });
      setQuestionCommentSubmit((prev) => !prev);
      setQuestionComment("");

      toast.success("Question Comment Added Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    async function loadAnswers() {
      if (!question) return;
      try {
        const getAnswers = await databases.listDocuments(db, answerCollection, [
          Query.equal("questionId", question.$id),
        ]);
        setLoadAllAnswers(getAnswers.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }

    loadAnswers();
  }, [question, answerSubmit]);

  async function handleAnswerSubmit() {
    if (!user) return;
    if (!value) {
      toast.error("Answer cannot be empty");
      return;
    }
    try {
      const answer = await axios.post("/api/answer", {
        questionId: question.$id,
        answer: value,
        authorId: user.$id,
      });
      if (answer.data.error) {
        toast.error(answer.data.error);
        return;
      }
      setAnswerSubmit((prev) => !prev);
      setValue("");
      setAnswerAuthorReputation(Number(answer.data.prefs.reputation) + 1);
      if (question.authorId === user.$id) {
        setQuestionAuthorReputation(Number(answer.data.prefs.reputation) + 1);
      }
      toast.success("Answer Added Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (!question) return;
    if (!user) return;
    async function getCurrentUserVoteStatus() {
      const currentUserVote = await databases.listDocuments(
        db,
        voteCollection,
        [
          Query.equal("typeId", question.$id),
          Query.equal("type", "question"),
          Query.equal("votedById", user.$id),
          Query.limit(1),
        ]
      );
      if (
        currentUserVote.total > 0 &&
        currentUserVote.documents[0].voteStatus == "upvoted"
      ) {
        setVoteStatus("upvoted");
      }
      if (
        currentUserVote.total > 0 &&
        currentUserVote.documents[0].voteStatus == "downvoted"
      ) {
        setVoteStatus("downvoted");
      }
      if (currentUserVote.total === 0) {
        setVoteStatus("notvoted");
      }
    }
    getCurrentUserVoteStatus();
  }, [question]);

  useEffect(() => {
    if (!question) return;
    async function getTotalVotes() {
      try {
        const [upvotes, downvotes] = await Promise.all([
          databases.listDocuments(db, voteCollection, [
            Query.equal("typeId", question.$id),
            Query.equal("type", "question"),
            Query.equal("voteStatus", "upvoted"),
            Query.limit(1),
          ]),
          databases.listDocuments(db, voteCollection, [
            Query.equal("typeId", question.$id),
            Query.equal("type", "question"),
            Query.equal("voteStatus", "downvoted"),
            Query.limit(1),
          ]),
        ]);

        setTotalVotes(upvotes.total - downvotes.total);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getTotalVotes();
  }, [voteSubmit, question]);

  async function handleQuestionUpvote() {
    if (!user) return;
    try {
      const isUpvoteExisting = await databases.listDocuments(
        db,
        voteCollection,
        [
          Query.equal("typeId", question.$id),
          Query.equal("type", "question"),
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
        setVoteSubmit((prev) => !prev);
        setVoteStatus("notvoted");
        toast.error("Question Upvote Deleted Successfully");
        return;
      }
      const isDownvoteExisting = await databases.listDocuments(
        db,
        voteCollection,
        [
          Query.equal("typeId", question.$id),
          Query.equal("type", "question"),
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
        setVoteSubmit((prev) => !prev);
        setVoteStatus("notvoted");
        toast.error("Question Downvote Deleted Successfully");
      }
      const createUpvote = await databases.createDocument(
        db,
        voteCollection,
        ID.unique(),
        {
          type: "question",
          typeId: question.$id,
          voteStatus: "upvoted",
          votedById: user.$id,
        }
      );
      setVoteSubmit((prev) => !prev);
      setVoteStatus("upvoted");
      toast.success("Question Upvoted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleQuestionDownvote() {
    if (!user) return;
    try {
      const isDownvoteExisting = await databases.listDocuments(
        db,
        voteCollection,
        [
          Query.equal("typeId", question.$id),
          Query.equal("type", "question"),
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
        setVoteSubmit((prev) => !prev);
        setVoteStatus("notvoted");
        toast.error("Question Downvote Deleted Successfully");
        return;
      }
      const isUpvoteExisting = await databases.listDocuments(
        db,
        voteCollection,
        [
          Query.equal("typeId", question.$id),
          Query.equal("type", "question"),
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
        setVoteSubmit((prev) => !prev);
        setVoteStatus("notvoted");
        toast.error("Question Upvote Deleted Successfully");
      }
      const createDownvote = await databases.createDocument(
        db,
        voteCollection,
        ID.unique(),
        {
          type: "question",
          typeId: question.$id,
          voteStatus: "downvoted",
          votedById: user.$id,
        }
      );
      setVoteSubmit((prev) => !prev);
      setVoteStatus("downvoted");
      toast.success("Question Downvoted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    async function loadAnswerComments() {
      try {
        const getAnswerComments = await databases.listDocuments(
          db,
          commentCollection,
          [Query.equal("type", "answer")]
        );
        setLoadAllAnswerComments(getAnswerComments.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    loadAnswerComments();
  }, [answerCommentSubmit]);

  if (
    !(
      question &&
      questionAuthor &&
      questionAuthorAvatar &&
      loadAllQuestionComments &&
      loadAllAnswers &&
      loadAllAnswerComments &&
      totalVotes != null
    )
  )
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-12">
        <h1 className="text-center border-4 rounded-xl p-8 border-gray-700">
          <span className="text-5xl xs:text-6xl  bg-gradient-to-r from-[#8E2DE2] to-[#4a00e0] bg-clip-text text-transparent font-bold">
            {message}
          </span>
        </h1>
        {message === "Question not found !!" && (
          <h2 className="text-2xl">
            You will be redirected to Home in{" "}
            {countdown > 1 ? `${countdown} Seconds` : `${countdown} Second`}
          </h2>
        )}
      </div>
    );

  return (
    <div className="grid grid-cols-1 pl-4 md:pl-10 pt-4 md:pt-16 pb-6 md:pb-6 pr-12 md:pr-10 gap-8 md:gap-12 relative overflow-hidden min-h-max ">
      {loadParticles && (
        <ParticlesBackground
          quantity={2000}
          answersLength={loadAllAnswers.length}
          className="hidden md:block"
        />
      )}
      {loadParticles && (
        <ParticlesBackground
          quantity={800}
          answersLength={loadAllAnswers.length}
          className="hidden xs:block md:hidden"
        />
      )}
      {loadParticles && (
        <ParticlesBackground
          quantity={500}
          answersLength={loadAllAnswers.length}
          className="block xs:hidden"
        />
      )}
      <div className="md:row-start-1 flex justify-center w-full fixed md:static left-[44%] xs:left-[45%] sm:left-[46%] bottom-[2%] z-100">
        <FloatingDock items={links} />
      </div>
      <div className="row-start-1 md:row-start-2 flex justify-between border-b-2 border-zinc-700 p-2 h-max font-bold">
        <div className="flex flex-col gap-4 text-sm md:text-lg">
          <h1 className="text-2xl md:text-4xl text-blue-500">
            {question.title}
          </h1>
          <div className="flex gap-2 sm:gap-4">
            <p className="text-yellow-300">{dateFormat}</p>
            <p className="text-pink-500">
              {loadAllAnswers.length === 0 ? (
                "No Answers"
              ) : loadAllAnswers.length === 1 ? (
                <>
                  Answers: <span className="text-purple-500">1</span>
                </>
              ) : (
                <>
                  Answers:{" "}
                  <span className="text-purple-500">
                    {loadAllAnswers.length}
                  </span>
                </>
              )}
            </p>
            <p className="text-pink-500">
              {totalVotes === 0 ? (
                "No Votes"
              ) : totalVotes === 1 ? (
                <>
                  Votes: <span className="text-purple-500">1</span>
                </>
              ) : (
                <>
                  Votes: <span className="text-purple-500">{totalVotes}</span>
                </>
              )}
            </p>
          </div>
        </div>
        <ShimmerButton
          className="shadow-2xl h-max place-self-end p-4"
          onClick={() => router.push("/askquestion")}
        >
          <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 text-xs sm:text-sm md:text-lg">
            Ask A Question
          </span>
        </ShimmerButton>
      </div>
      <div className="row-start-2 md:row-start-3 grid grid-cols-[4%_1fr] grid-rows-[max-content_max-content_max-content] gap-y-4 gap-x-2 xs:gap-4 font-bold">
        <div className="col-start-1 row-span-3 flex flex-col items-center gap-2 md:gap-4">
          <button
            className={`rounded-full hover:bg-gray-800 transition duration-100 border-2 border-gray-500 w-max cursor-pointer p-1 opacity-70 hover:opacity-100 ${
              voteStatus === "upvoted"
                ? "opacity-100 bg-gray-800 hover:bg-gray-900"
                : "opacity-70"
            }`}
            onClick={handleQuestionUpvote}
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
          <p className="text-xs xs:text-sm md:text-xl text-purple-500">
            {totalVotes}
          </p>
          <button
            className={`rounded-full hover:bg-gray-800 transition duration-100 border-2 border-gray-500 w-max cursor-pointer p-1 opacity-70 hover:opacity-100 ${
              voteStatus === "downvoted"
                ? "opacity-100 bg-gray-800 hover:bg-gray-900"
                : "opacity-70"
            }`}
            onClick={handleQuestionDownvote}
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
                <IconCaretDown
                  size={20}
                  className="hidden xs:block md:hidden"
                />
                <IconCaretDown size={10} className="block xs:hidden" />
              </div>
            )}
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#080d1a] z-20 col-start-2 row-start-1">
          <h2 className="text-xl md:text-3xl border-b-2 pb-2 border-zinc-800 text-blue-500">
            {question.title}
          </h2>
          <MDEditor.Markdown
            source={question.content}
            style={{ fontSize: "16px" }}
            className="hidden md:block"
          />
          <MDEditor.Markdown
            source={question.content}
            style={{ fontSize: "12px" }}
            className="block md:hidden"
          />
        </div>
        <div className="flex flex-col gap-4 col-start-2 row-start-2 z-20">
          {question?.Image ? (
            <img
              className="rounded-lg"
              src={question.Image}
              alt="Question Image"
              onLoad={() => setLoadParticles(true)}
              onError={() => setLoadParticles(true)}
            />
          ) : null}
          <div className="flex justify-between">
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
              {question.tags?.map((tag, index) => (
                <div key={index}>
                  <button className="rounded-lg bg-zinc-800 pl-2 pr-2 pt-1 pb-1 text-xs md:text-base hover:bg-zinc-900 cursor-pointer transition duration-100">
                    {`#${tag}`}
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[max-content_max-content] grid-rows-[max-content_max-content] gap-x-2">
              <div className="col-start-1 row-span-2">
                <img
                  src={questionAuthorAvatar}
                  alt="Avatar"
                  className="hidden md:block rounded-sm"
                />
                <img
                  src={questionAuthorAvatarmd}
                  alt="Avatar"
                  className="rounded-sm block md:hidden"
                />
              </div>
              <p className="text-xs md:text-base col-start-2 row-start-1 text-orange-400">
                {questionAuthor.name}
              </p>
              <p className="text-xs md:text-base col-start-2 row-start-2 ">
                Rep:{" "}
                <span className="text-purple-500">
                  {questionAuthorReputation}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-start-2 row-start-3 border-t-2 border-zinc-700 ">
          <h3 className="text-lg md:text-2xl my-2 md:my-4 text-[#FF5349]">
            {loadAllQuestionComments.length === 0
              ? "No Comments"
              : loadAllQuestionComments.length === 1
              ? "1 Comment"
              : `${loadAllQuestionComments.length} Comments`}
          </h3>
          {loadAllQuestionComments.map((comment, index) => (
            <div
              key={index}
              className="flex justify-between border-y-2 items-center mb-2"
            >
              <CommentEditAndDelete comment={comment} type="question" />
            </div>
          ))}

          <div className="flex flex-col sm:grid sm:grid-cols-[85%_1fr] gap-2 border-y-2 border-zinc-700 py-2 sm:py-4">
            {user ? (
              <>
                <textarea
                  className="p-2 rounded-lg bg-[#080d1a] z-20 border border-zinc-700 text-xs md:text-base"
                  placeholder="Add a comment..."
                  rows="1"
                  value={questionComment}
                  onChange={(e) => setQuestionComment(e.target.value)}
                ></textarea>
                <button
                  className="col-start-2 rounded-lg text-xs sm:text-sm md:text-lg bg-amber-600 hover:bg-amber-700 font-bold cursor-pointer max-h-max p-2 text-white z-30 transition duration-200 w-max sm:w-auto "
                  onClick={handleQuestionComment}
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
                      router.push(
                        `/login/?question=${encodeURIComponent(
                          true
                        )}&redirectUrl=${encodeURIComponent(id)}`
                      );
                    }}
                  >
                    Login to comment
                  </h2>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row-start-3 md:row-start-4 flex flex-col border-t-2 border-zinc-700 font-bold">
        <h3 className="text-lg md:text-2xl my-2 md:my-4 text-[#FF5349]">
          {loadAllAnswers.length === 0
            ? "No Answers"
            : loadAllAnswers.length === 1
            ? "1 Answer"
            : `${loadAllAnswers.length} Answers`}
        </h3>
        {loadAllAnswers.map((answer, index) => (
          <div key={index}>
            <AnswerContainer
              authorId={answer.authorId}
              content={answer.content}
              id={answer.$id}
              comments={loadAllAnswerComments.filter(
                (comment) => comment.typeId === answer.$id
              )}
              createdAt={answer.$createdAt}
              questionAuthorId={question.authorId}
            />
          </div>
        ))}
      </div>
      <div className="row-start-4 md:row-start-5 flex flex-col border-t-2 border-zinc-700 font-bold">
        {user ? (
          <>
            <h3 className="text-lg md:text-2xl my-2 md:my-4 text-[#FF5349]">
              Your Answer
            </h3>
            <MarkdownEditor className="hidden md:block" />
            <MarkdownEditor className="hidden sm:block md:hidden markdownmd" />
            <MarkdownEditor className="block sm:hidden markdownsm" />
            <button
              className="col-start-2 rounded-lg text-xs sm:text-sm md:text-lg bg-amber-600 text-white hover:bg-amber-700 font-bold cursor-pointer w-max pt-2 pb-2 pl-4 pr-4 z-30 transition duration-200 mt-4"
              onClick={handleAnswerSubmit}
            >
              Post Answer
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center mt-2">
              <h2
                className="text-base md:text-xl text-red-400 text-center border-4 rounded-xl px-4 py-2 border-gray-700 hover:text-red-500 transition duration-200 cursor-pointer"
                onClick={() => {
                  router.push(
                    `/login/?question=${encodeURIComponent(
                      true
                    )}&redirectUrl=${encodeURIComponent(id)}`
                  );
                }}
              >
                Login to Post Answer
              </h2>
            </div>
          </>
        )}
      </div>
      <div className="row-start-5 md:row-start-6 relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.5}
          duration={1.5}
          repeatDelay={1}
          className="mask-radial-[800px_circle_at_center,white,transparent] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        />
        <p className="text-xs xs:text-sm sm:text-base md:text-lg absolute text-center bottom-[10%] bg-black">
          © 2025 StackFlow QnA System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default question;
