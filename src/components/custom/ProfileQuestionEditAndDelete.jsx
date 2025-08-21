import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import usePaginationStore from "@/store/Pagination";
import dateFormatter from "@/utils/dateFormatter";
import { IconCircleMinus, IconEdit } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";

function ProfileQuestionEditAndDelete({id, createdAt}) {
  const { reset, answersForQuestion, setTotalQuestions, totalQuestions } =
    usePaginationStore();
  const { resetProfile } = useLoggedInUserDetailsStore();
  async function handleQuestionDelete(e) {
    e.stopPropagation();
    e.preventDefault();

    try {
      const deleteQuestionData = await axios.delete("/api/deleteQuestionData", {
        data: {
          questionId: id,
          answerList: answersForQuestion.filter(
            (answer) => answer.questionId === id
          ),
        },
      });
      if (deleteQuestionData.data.error) {
        toast.error(deleteQuestionData.data.error);
        return;
      }

      toast.success(deleteQuestionData.data.message);
      reset();
      resetProfile();
      setTotalQuestions(totalQuestions - 1);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }
  return (
    <div className="flex gap-4 text-md bg-gray-950 w-max px-2 py-1 rounded-xl justify-end">
      <button className="cursor-pointer opacity-70 hover:opacity-100 flex gap-2 transition duration-150">
        <IconEdit size={28} color="green" />
        <p className="mt-[1.5px]">Edit</p>
      </button>
      <button
        className="cursor-pointer opacity-70 hover:opacity-100 flex gap-2 transition duration-150"
        onClick={handleQuestionDelete}
      >
        <IconCircleMinus color="red" size={28} />
        <p className="mt-[1.5px]">Delete</p>
      </button>
      <p className="text-md text-yellow-300"> {dateFormatter(createdAt)}</p>
    </div>
  );
}

export default ProfileQuestionEditAndDelete;
