import React from "react";
import Action from "./Action";

const SingleComment = ({ comment, loggedInUserEmail, onDelete, onEdit }) => {
  return (
    <div className="w-1/2">
      <span className=" text-[.6rem] px-4  z-10 text-gray-500 ">
        <span className="bg-white bg-opacity-50 rounded-full px-3 mx-2  py-1 ">
          {comment.user.email}
        </span>
      </span>
      <div className="px-4 py-4 rounded-full bg-white bg-opacity-60 flex justify-between items-center">
        <p className=" text-sm">{comment.content}</p>
        {comment.user.email === loggedInUserEmail ? (
          <Action onDelete={onDelete} onEdit={onEdit} comment={comment} />
        ) : null}
      </div>
    </div>
  );
};

export default SingleComment;
