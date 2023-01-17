import React, { useState } from "react";
import "./Blog.css";

const BlogCards = () => {
  const [blogs, setBlogs] = useState([
    {
      _id: "1",
      imageStr: "https://via.placeholder.com/300x400",
      caption: "Blog Post 1",
      author: {
        username: "Author 1"
      }
    },
    {
      _id: "2",
      imageStr: "https://via.placeholder.com/300x400",
      caption: "Blog Post 2",
      author: {
        username: "Author 2"
      }
    },
    {
      _id: "3",
      imageStr: "https://via.placeholder.com/300x400",
      caption: "Blog Post 2",
      author: {
        username: "Author 2"
      }
    },
    {
      _id: "4",
      imageStr: "https://via.placeholder.com/300x400",
      caption: "Blog Post 2",
      author: {
        username: "Author 2"
      }
    },
    {
      _id: "5",
      imageStr: "https://via.placeholder.com/300x400",
      caption: "Blog Post 2",
      author: {
        username: "Author 2"
      }
    },
    // Add more blog posts here
  ]);

  return (
    <div className="blog-card-container">
      {blogs.map((blog) => (
        <div className="blog-card" key={blog._id}>
          <img src={blog.imageStr} alt={blog.caption} />
          <h3>{blog.caption}</h3>
          <p>{blog.author.username}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogCards;
