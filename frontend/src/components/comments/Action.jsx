import React from "react";

import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import BASE_URL from "../../constant/constant";

const Action = ({ comment, onDelete, onEdit }) => {
  const [editModal, setEditModal] = useState(false);
  const [textComment, setTextComment] = useState(comment?.content ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // set timeout
  if (!!success) {
    setTimeout(() => {
      setSuccess(!success);
    }, 5000);
  }
  if (!!error) {
    setTimeout(() => {
      setError(!error);
    }, 5000);
  }

  const handelDelete = async () => {
    // console.log("delete");
    const deleteComment = async (id) => {
      const response = await fetch(`${BASE_URL}/comment/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    };
    if (comment?.id) {
      const data = await deleteComment(comment?.id);
      if (data.data) {
        setSuccess(data.message);
      } else {
        setError(data.message);
      }
      // console.log(data);
      setEditModal(false);
      onDelete(comment?.id);
    }
  };

  const editComment = async () => {
    const editCommentDb = async (id) => {
      console.log(`${BASE_URL}/category/update/${id}`);
      const response = await fetch(`${BASE_URL}/comment/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: textComment }),
      });

      const data = response.json();
      return data;
    };
    if (comment.content !== textComment) {
      const data = await editCommentDb(comment?.id);
      console.log(data);
      if (data) {
        setEditModal(false);
        // on edit
        onEdit(comment?.id);
      }
    }
  };

  useEffect(() => {
    setTextComment(comment?.content);
  }, [editModal]);

  return (
    <>
      <div className="flex justify-end relative">
        {success ? (
          <div>
            <p className=" text-green-600 text-sm mt-2">{success}</p>
          </div>
        ) : (
          <div>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
        )}
        <button
          onClick={() => setEditModal(!editModal)}
          className="text-gray-500 p-2 rounded-full"
        >
          <TbEdit />
        </button>
        <button
          onClick={handelDelete}
          className="text-gray-500 p-2 rounded-full"
        >
          <AiOutlineDelete />
        </button>

        {/* edit modal */}
        {editModal ? (
          <>
            <div className="justify-center z-20 bg-black bg-opacity-80 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-3xl font-semibold">Edit Comment</h3>
                    <button
                      className="p-1 ml-auto border-0 text-black opacity-100 mt-[-.5rem] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setEditModal(false)}
                    >
                      <span className="">×</span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="my-4 text-gray-600 text-lg leading-relaxed">
                      <div className="flex flex-col">
                        <input
                          type="text"
                          name="commentText"
                          placeholder="Category Name"
                          value={textComment}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setTextComment(e.target.value);
                          }}
                          className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                        />
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setEditModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-brand-primary text-white hover:bg-brand-dark font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={editComment}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Action;
