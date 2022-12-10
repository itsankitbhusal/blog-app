import React from "react";

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
    <div>
      {Array.isArray(blog)
        ? blog.map((post, index) => (
            <div key={index}>
              <img src={post.image} alt="" />
              <span>{post.category.name}</span>
              <h1>{post.title}</h1>
              {/* limit body to preview characters  */}
              <p>{post.body.slice(0, 200) + "..."}</p>
              <p>{post.user.firstName + " " + post.user.lastName}</p>
              <span>
                {new Date(post.createdAt).toDateString().slice(4, 10) +
                  ", " +
                  new Date(post.createdAt).toTimeString().slice(0, 5)}
              </span>
            </div>
          ))
        : null}
    </div>
  );
};

export default BlogCard;
