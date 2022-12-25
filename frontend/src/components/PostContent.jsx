/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BASE_URL from "../constant/constant";

const PostContent = () => {
  const { id } = useParams();

  const [error, setError] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    fetchPostContent();
  }, [id]);

  const fetchPostContent = async () => {
    const response = await fetch(`${BASE_URL}/post/get/${id}`);
    const data = await response.json();
    // console.log(data);
    if (data.message === "Post not found") {
      console.log("post not found");
      setError(true);
    } else {
      setPost(data.data);
    }
  };

  return (
    <>
      {!error ? (
        <div className="grid place-items-center h-full py-16">
          {/* {post ? ( */}
          <div className="flex flex-col items-center justify-center">
            <div className="">
              <div className="flex flex-col items-center justify-center">
                <div className="flex w-[90vw] h-[50vh] relative">
                  <img
                    className="object-cover w-full h-full rounded-sm opacity-20"
                    draggable="false"
                    src={post?.image}
                    alt={`image${post?.id}`}
                  />
                  <img
                    className="absolute right-0 h-[50vh] rounded-sm max-w-[90vw]"
                    draggable="false"
                    src={post?.image}
                    alt={post?.id}
                  />
                </div>
                <div className="flex self-start pt-4">
                  <span className=" bg-brand-light px-5 py-1 rounded-full text-sm text-white">
                    {post?.category?.name}
                  </span>
                </div>
                <div className="pb-16 pt-4 w-[90vw] text-justify">
                  <h1 className="text-3xl font-bold pb-4">{post?.title}</h1>
                  <p className="text-gray-500">{post?.body}</p>
                </div>
              </div>
            </div>
          </div>
          {/* ) : null} */}
        </div>
      ) : (
        <div>Post not found...</div>
      )}
    </>
  );
};

export default PostContent;
