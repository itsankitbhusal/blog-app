import React, { useState, useEffect } from "react";
import BlogCard from "./Hero/BlogCard";

const PostList = () => {
  const [postList, setPostList] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user id: ", user.id);

  useEffect(() => {
    // getPostList();
    const getPostList = async () => {
      const response = await fetch("http://localhost:8000/post/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
        }),
      });
      const data = await response.json();
      // console.log("data: ", data.data);
      setPostList(data.data);
    };
    getPostList();
  }, []);

  // console.log(postList);
  return (
    <>
      <div className=" w-[75vw] my-16 overflow-auto">
        <BlogCard blog={postList} setPostList={setPostList} />
      </div>
    </>
  );
};

export default PostList;
