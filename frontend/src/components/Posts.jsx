import React from "react";
import Sidebar from "./dashboard/Sidebar";
import PostList from "./PostList";

const Posts = () => {
  return (
    <>
      <main className="w-full h-[90vh] shadow-2xl shadow-gray-300/50 mb-20 flex">
        <Sidebar />
        <PostList />
      </main>
    </>
  );
};

export default Posts;
