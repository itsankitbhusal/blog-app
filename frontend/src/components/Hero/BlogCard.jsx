import React from "react";

//   id,
//   image,
//   title,
//   userId,
//   body,
//   categoryId,
//   createdAt,
//   UpdatedAt,

const BlogCard = ({ blog }) => {
  return (
    <div>
      {Array.isArray(blog)
        ? blog.map((post, index) => (
            <div key={index}>
              <img src={post.image} alt="" />
              <h1>{post.title}</h1>
              <p>{post.body}</p>
              <p>{post.userId}</p>
              <p>{post.categoryId}</p>
              <p>{post.createdAt}</p>
              <p>{post.UpdatedAt}</p>
            </div>
          ))
        : null}
    </div>
  );
};

export default BlogCard;
