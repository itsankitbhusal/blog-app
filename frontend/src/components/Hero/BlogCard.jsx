import React, { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { LoginContext } from "../context/LoginContext";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin4Line } from "react-icons/ri";
import BASE_URL from "../../constant/constant";
import usePostData from "../usePostData";
import { useState } from "react";

const BlogCard = ({ blog, setPostList }) => {
  const { isSignedIn } = useContext(LoginContext);
  const [showModel, setShowModel] = React.useState(false);

  const [singlePost, setSinglePost] = React.useState({});

  // maintain form states

  const [title, setTitle] = useState(singlePost.title);
  const [content, setContent] = useState(singlePost.body);
  const [imgUrl, setImgUrl] = useState(singlePost.image);
  const [category, setCategory] = useState(null);

  const [postList] = usePostData("http://localhost:8000/category/get/");

  const handelDelete = async (id) => {
    const deletePost = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (deletePost) {
      // delete post from server
      const data = await deletePostWithId(id);
      console.log(data);
      // delete post from state
      const updatedPost = blog.filter((post) => post.id !== data.data.post.id);

      console.log(updatedPost);

      // update state
      setPostList(updatedPost);
    }
  };

  const deletePostWithId = async (id) => {
    // console.log("delete post with id: ", id);
    try {
      //  make delete request to server
      const response = await fetch(`${BASE_URL}/post/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handelEdit = async (id) => {
    console.log("Edit");
    setShowModel(true);
    const response = await fetch(`${BASE_URL}/post/get/${id}`);
    const data = await response.json();
    console.log(data);
    setSinglePost(data.data);
  };

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
                        {/* edit post */}
                        <TbEdit onClick={() => handelEdit(post.id)} />
                      </span>
                      <span className=" hover:cursor-pointer">
                        {/* delete post */}
                        <RiDeleteBin4Line
                          onClick={() => handelDelete(post.id)}
                        />
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
      {/* show model */}
      {showModel ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-10 flex justify-center items-center transition-all ">
          <div className="bg-white w-[50vw] h-4/3 rounded-lg flex flex-col justify-center items-center relative">
            <h1 className="text-2xl font-bold pt-16">Edit Post</h1>
            <form className=" grid place-items-center my-16">
              <div className=" grid place-items-center gap-4 w-[40vw]">
                <div className=" flex gap-4 items-center justify-between w-full">
                  <label htmlFor="title" className=" font-semibold">
                    Title:
                  </label>
                  <input
                    className=" p-2 border rounded-sm w-full ml-11"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>

                <div className=" flex gap-4 items-center w-full justify-between">
                  <label htmlFor="title" className=" font-semibold">
                    ImageURL:
                  </label>
                  <input
                    className=" p-2 border rounded-sm w-full"
                    type="url"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                </div>
                <div className=" flex gap-4 items-center w-full justify-between">
                  <label htmlFor="title" className=" font-semibold">
                    Category:
                  </label>
                  <select
                    className=" p-2 ml-2 border rounded-sm w-full"
                    name="category"
                    id="category"
                    onChange={(e) => {
                      // selected id
                      const id = e.target.options[e.target.selectedIndex].id;
                      setCategory(id);
                    }}
                  >
                    {postList.map((category) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4 items-center w-full justify-between">
                  <label htmlFor="title" className=" font-semibold self-start">
                    Content:
                  </label>
                  <textarea
                    className=" p-2 border rounded-sm w-full ml-4 h-[20vh]"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                <div className=" flex gap-4 items-center w-full justify-end">
                  <button
                    value="submit"
                    className="btn bg-brand-primary text-white rounded-sm py-3 px-7 font-semibold w-1/3"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
            {/* finish */}
            <button
              className="bg-brand-primary text-white px-4 py-2 absolute top-0 right-0"
              onClick={() => setShowModel(false)}
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BlogCard;
