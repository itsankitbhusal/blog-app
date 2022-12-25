import React from "react";
import { useState, useRef } from "react";
import Sidebar from "../dashboard/Sidebar";
import usePostData from "../usePostData";

const AddPost = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const formRef = useRef(null);

  // get data from local storage
  const { id } = JSON.parse(localStorage.getItem("user"));

  const [postList] = usePostData("http://localhost:8000/category/get/");
  const handelSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      body: content,
      categoryId: category,
      image: imgUrl,
      userId: id,
    };
    const response = await postData(data);
    // console.log(response);
    if (response) {
      formRef.current.reset();
    }
  };

  const postData = async (data) => {
    const response = await fetch("http://localhost:8000/post/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const outData = await response.json();
    return outData.data;
  };

  return (
    <>
      <main className="w-full h-[90vh] shadow-2xl shadow-gray-300/50 mb-20 flex">
        <Sidebar />

        <div className=" grid w-full p-16 overflow-y-auto mt-8">
          {/* form to add blog */}
          <form onSubmit={handelSubmit} ref={formRef}>
            <div className=" grid gap-4">
              <div className=" flex gap-4 w-full justify-end items-center">
                <label htmlFor="title" className=" w-1/6 font-semibold">
                  Title
                </label>
                <input
                  className=" w-full rounded-sm py-2 px-4"
                  type="text"
                  name="title"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className=" flex gap-4 w-full  justify-end items-center">
                <label htmlFor="image" className=" w-1/6 font-semibold">
                  Image URL
                </label>
                <input
                  className=" w-full rounded-sm py-2 px-4"
                  type="url"
                  name="image"
                  id="image"
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </div>
              <div className=" flex gap-4 w-full justify-end items-center">
                <label htmlFor="data" className=" w-1/6 font-semibold">
                  Category
                </label>

                <select
                  id="data"
                  name="category"
                  className=" w-full rounded-sm py-2 px-4 bg-white border-none border-brand-light text-brand-primary hover:cursor-pointer"
                  onChange={(e) => {
                    // selected id
                    const id = e.target.options[e.target.selectedIndex].id;
                    setCategory(id);
                  }}
                >
                  <option id="0" value="Select Category">
                    Select Category
                  </option>
                  {Array.isArray(postList) ? (
                    postList.map((data, key) => (
                      <option id={data.id} key={key} value={data.name}>
                        {data.name}
                      </option>
                    ))
                  ) : (
                    <option value="Loading">Loading</option>
                  )}
                </select>
              </div>

              <div className="flex gap-4 w-full items-center justify-end">
                <label htmlFor="content" className=" w-1/6 font-semibold">
                  Content
                </label>
                <textarea
                  className=" w-full rounded-sm h-[30vh] py-2 px-4"
                  name="content"
                  id="content"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <div className=" flex justify-end w-full">
                <button
                  type="submit"
                  className=" bg-brand-primary text-white rounded-sm py-3 px-7 font-semibold"
                >
                  Add Blog
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default AddPost;
