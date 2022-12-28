import React, { useState, useEffect, useContext } from "react";
import BASE_URL from "../../constant/constant";
import SingleComment from "./SingleComment";
import { MdSend } from "react-icons/md";
import { LoginContext } from "../context/LoginContext";

const LoadComments = ({ postId }) => {
  const { isSignedIn } = useContext(LoginContext);
  const [comments, setComments] = useState([]);

  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const checkLength = () => {
    if (commentText.length > 100) {
      setCommentText(commentText.slice(0, 100));
      setError("Comment length should be less than 100");
    } else {
      setError("");
    }
  };

  // get logged in user email
  const user = JSON.parse(localStorage.getItem("user"));
  let loggedInUserEmail;
  let userId;
  if (user) {
    loggedInUserEmail = JSON.parse(localStorage.getItem("user")).email;
    userId = JSON.parse(localStorage.getItem("user")).id;
    // loggedInUserEmail = user.email;
    userId = user.id;
  } else {
    loggedInUserEmail = null;
    userId = null;
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!!commentText) {
      async function addComment() {
        const response = await fetch("http://localhost:8000/comment/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: commentText,
            userId: userId,
            postId: postId,
          }),
        });
        const data = await response.json();
        if (!!data) {
          console.log("comment added");
          setCommentText("");
          setIsDataUpdated(!isDataUpdated);
        }
      }
      addComment();
    }
  };

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(`${BASE_URL}/comment/post/${postId}`);
      const data = await response.json();
      setComments(data.data);
    };
    getComments();
  }, [postId, isDataUpdated]);

  // handle the update of child component
  const handleDelete = (id) => {
    // filter id
    const filterComment = comments.filter((c) => c.id !== id);
    setComments(filterComment);
  };
  const handelEdit = async (id) => {
    // handel edit
    const response = await fetch(`${BASE_URL}/comment/post/${postId}`);
    const data = await response.json();
    setComments(data.data);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-700 my-4">Comments :</h1>
      <div className="flex flex-col space-y-2">
        {comments.length > 0
          ? comments.map((comment) => (
              <SingleComment
                onDelete={handleDelete}
                onEdit={handelEdit}
                key={comment.id}
                comment={comment}
                loggedInUserEmail={loggedInUserEmail}
              />
            ))
          : null}
      </div>
      {/* 
      
      this
      here
      
      
      */}
      {isSignedIn ? (
        <div className="flex items-center flex-col space-x-3 mt-12 mb-4 w-1/2 relative">
          <form onSubmit={handelSubmit} className="w-full flex items-center">
            <input
              type="text"
              value={commentText}
              placeholder="Add a comment..."
              className="w-full bg-white rounded-full px-8 py-4 focus:outline-none"
              onChange={(e) => {
                setCommentText(e.target.value);
                checkLength();
              }}
            />
            {/* show error message */}

            <button
              type="submit"
              className=" ml-[-3.1rem] p-4 rounded-full hover:cursor-pointer"
            >
              <MdSend />
            </button>
          </form>
          {error && (
            <p className="text-red-500 text-xs px-4 absolute top-10">{error}</p>
          )}
        </div>
      ) : (
        // login to comment
        <div className=" flex items-center flex-col space-x-3 mt-12 mb-4 w-1/2">
          <p className=" text-xl">Login to add comments...</p>
        </div>
      )}
    </>
  );
};
export default LoadComments;
