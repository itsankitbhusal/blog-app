import { marked } from "marked";

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import BASE_URL from "../constant/constant";
import LoadComments from "./comments/LoadComments";

const PostContent = () => {
  // using context api

  const { id } = useParams();

  const [error, setError] = useState(false);
  const [post, setPost] = useState({});
  const [htmlString, setHtmlString] = useState("");

  const parseMarkdown = (markdownContent) => {
    return marked(markdownContent, { sanitize: true });
  };

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
      setHtmlString(parseMarkdown(data.data.body));
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
                  {/* <p className="text-gray-500">{post?.body}</p> */}
                  {post?.body ? (
                    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
                  ) : (
                    <div>Post not found...</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* comment section */}
          <div className=" w-[90vw]">
            <LoadComments postId={id} />
          </div>
        </div>
      ) : (
        <div>Post not found...</div>
      )}
    </>
  );
};

export default PostContent;
