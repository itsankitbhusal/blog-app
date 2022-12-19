import React from "react";
import { ImBlog } from "react-icons/im";
import { BiCategoryAlt } from "react-icons/bi";
import LinksTab from "./LinksTab";

const Sidebar = () => {
  return (
    <>
      <aside className="w-1/4 h-full py-8 grid place-items-center shadow-2xl shadow-inherit">
        <div className="text-center">
          <h1 className=" font-bold text-4xl">My Blog</h1>
          <p className="text-gray-500">Admin panel for my blog</p>
        </div>
        <div className="links font-semibold grid">
          {/* posts */}
          <LinksTab
            name="Posts"
            value="Add Post"
            hrefLink="/dashboard/posts"
            hrefLink2="/dashboard/posts/add"
            icon={<ImBlog />}
          />
          {/* categories */}
          <LinksTab
            name="Categories"
            value="Add Category"
            hrefLink="/dashboard/category"
            hrefLink2="/dashboard/category/add"
            icon={<BiCategoryAlt />}
          />
        </div>
        <div className="text-gray-500 text-center text-sm">
          <p className="">
            Copyright &copy; {new Date().getFullYear()}{" "}
            <span className=" font-medium">MyBlog</span>
          </p>
          <p>
            Designed with <span className=" text-red-500">❤️</span> by{" "}
            <span className=" font-medium">Ankit Bhusal</span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
