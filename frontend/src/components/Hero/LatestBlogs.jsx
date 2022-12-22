import React from "react";
import GetBlogs from "./GetBlogs";

const LatestBlogs = () => {
  return (
    <>
      <div className="flex flex-col justify-start items-center gap-4 bg-white py-10 px-[10rem] text-center h-auto pb-28">
        <div className=" py-8">
          <h1 className="text-6xl font-black">Latest Blogs</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur elit, Fuga sint quia atque
            fugiat dolores
          </p>
        </div>
        <div>
          <GetBlogs />
        </div>
      </div>
    </>
  );
};

export default LatestBlogs;
