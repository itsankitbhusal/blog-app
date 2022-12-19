import React from "react";
import usePostData from "./usePostData";
import BlogCard from "./Hero/BlogCard";

const PostList = () => {
  const [postList, refreshData] = usePostData(
    "http://localhost:8000/post/get/limit/9"
  );
  console.log(postList);
  return (
    <>
      <div className=" w-[75vw] my-16 overflow-auto">
        <BlogCard blog={postList} />
      </div>
    </>
  );
};

export default PostList;
