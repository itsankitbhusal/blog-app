import React from "react";

import { AiOutlineUser } from "react-icons/ai";

/* 
  id
  body
  title
  image
  category
    id
    name
  user
  id
   firstName
   lastName



*/

const BlogCard = ({ blog }) => {
  return (
    <div className="flex flex- gap-8 flex-wrap justify-center items-center h-[50vh]">
      {Array.isArray(blog)
        ? blog.map((post, index) => (
            <div
              key={index}
              className="rounded-lg p-4 w-[20vw] h-[50vh] flex flex-col gap-2 justify-between hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              <img
                className="bg-center object-cover rounded-lg h-[30vh]"
                src={post.image}
                alt={post.id}
              />
              <div>
                <span className=" bg-brand-light py-1 px-3 text-[.7rem] text-white  rounded-full">
                  {post.category.name}
                </span>
              </div>
              <h1 className=" font-bold">{post.title}</h1>
              {/* limit body to preview characters  */}
              <p className=" text-brand-light">
                {post.body.slice(0, 200) + "..."}
              </p>
              <div className=" text-brand-primary text-sm">
                <div className=" flex gap-2 items-center justify-between">
                  <span className=" flex items-center">
                    <AiOutlineUser />
                    {post.user.firstName + " " + post.user.lastName}
                  </span>
                  <span className=" text-brand-light text-[.7rem] mr-2">
                    {new Date(post.createdAt).toDateString().slice(4, 10) +
                      ", " +
                      new Date(post.createdAt).toTimeString().slice(0, 5)}
                  </span>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default BlogCard;
