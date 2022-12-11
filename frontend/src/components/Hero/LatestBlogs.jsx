import React from "react";
import GetBlogs from "./GetBlogs";

const LatestBlogs = () => {
  return (
    <>
      <div className="grid place-items-center gap-4 bg-white py-10 px-[10rem]">
        <h1 className="text-6xl font-black">Latest Blogs</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur elit, Fuga sint quia atque
          fugiat dolores
        </p>
        <GetBlogs />
      </div>
    </>
  );
};

export default LatestBlogs;
