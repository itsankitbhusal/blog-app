import React, { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { LoginContext } from "../context/LoginContext";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin4Line } from "react-icons/ri";

const BlogCard = ({ blog }) => {
  const { isSignedIn } = useContext(LoginContext);

  return (
    <div className="flex flex- gap-8 flex-wrap justify-center items-center h-[50vh] text-start">
      {Array.isArray(blog)
        ? blog.map((post, index) => (
            <div
              key={index}
              className="rounded-lg border w-[20vw] h-[50vh] flex flex-col "
            >
              <img
                className="bg-center object-cover rounded-t-lg h-[30vh]"
                draggable="false"
                src={post.image}
                alt={post.id}
              />
              <div className=" p-2 grid justify-between gap-2">
                <div className=" flex justify-between items-center">
                  <span className=" bg-brand-light py-1 px-3 text-[.7rem] text-white  rounded-full">
                    {post.category.name}
                  </span>
                  {/* create icons for  edit and delete */}
                  {isSignedIn ? (
                    <div className=" flex gap-2 text-brand-primary text-lg">
                      <span className=" hover:cursor-pointer">
                        <TbEdit />
                      </span>
                      <span className=" hover:cursor-pointer">
                        <RiDeleteBin4Line />
                      </span>
                    </div>
                  ) : null}
                </div>

                <h1 className=" font-bold mt-2 hover:cursor-pointer">
                  {post.title.length > 30
                    ? post.title.slice(0, 30) + "..."
                    : post.title}
                </h1>
                {/* limit body to preview characters  */}
                <p className=" text-brand-light">
                  {post.body.slice(0, 60) + "..."}
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
            </div>
          ))
        : null}
    </div>
  );
};

export default BlogCard;
