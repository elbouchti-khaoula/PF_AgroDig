import React, { useState } from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../contexts/BlogContext";
import { useEffect } from "react";

const BlogCards = () => {
  /*const handleClick = (_id) => {
    navigate(`/modify/${_id}`);
};*/

  let navigate = useNavigate();

  const { getBlogs, blogs } = useBlogs();

  useEffect(() => {
    getBlogs();
  }, []); 

  // const [blogs, setBlogs] = useState([
  //   {
  //     _id: "1",
  //     image: "https://via.placeholder.com/300x200",
  //     title: "Blog Post 1",
  //     username: "Author 1",
  //     body: "The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform.",
  //   },

  //   {
  //     _id: "2",
  //     image: "https://via.placeholder.com/300x200",
  //     title: "Blog Post 1",
  //     username: "Author 1",
  //     body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform.",
  //   },
  //   {
  //     _id: "3",
  //     image: "https://via.placeholder.com/300x200",
  //     title: "Blog Post 1",
  //     username: "Author 1",
  //     body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform.",
  //   },
  //   {
  //     _id: "4",
  //     image: "https://via.placeholder.com/300x200",
  //     title: "Blog Post 1",
  //     username: "Author 1",
  //     body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform.",
  //   },
  //   {
  //     _id: "5",
  //     image: "https://via.placeholder.com/300x200",
  //     title: "Blog Post 1",
  //     username: "Author 1",
  //     body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform.",
  //   },
  //   {
  //     _id: "6",
  //     image: "https://via.placeholder.com/300x200",
  //     title: "Blog Post 1",
  //     username: "Author 1",
  //     body: "This is an excerpt of the first blog post.",
  //   },
  //   {
  //     _id: "7",
  //     image: "https://via.placeholder.com/300x200",
  //     title: "Blog Post 1",
  //     username: "Author 1",
  //     body: "This is an excerpt of the first blog post.",
  //   },
  //   {
  //     _id: "8",
  //     image: "https://via.placeholder.com/300x200",
  //     title: "Blog Post 1",
  //     username: "Author 1",
  //     body: "This is an excerpt of the first blog post.",
  //   },
  //   {
  //     _id: "9",
  //     image: "https://via.placeholder.com/300x200",
  //     title: "Blog Post 1",
  //     username: "Author 1",
  //     body: "This is an excerpt of the first blog post.",
  //   },
  // ]);
  const truncateBody = (body) => {
    if (body.length > 100) {
      return body.substring(0, 100) + "...";
    }
    return body;
  };

  return (
    <div className="blog-container">
      <div className="vertical-blog-list">
        {blogs.map((blog) => (
          <div
            className="vertical-blog-card"
            key={blog.id}
            onClick={() =>
              navigate("/blog-detail", {
                state: {  
                  blog: blog,
                  blogid: blog.id,
                },
              })
            }
          >
            <img src={""} alt={blog.title} />
            <div className="title-container">
              <h3 className="title-font">{blog.title}</h3>
            </div>
            <div className="username-container">
              <div className="blog-card-user">
                <p className="author-name">{blog.poster.username}</p>
              </div>
            </div>
            <p className="body-text">{truncateBody(blog.body)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCards;
