import React, { useState } from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";


const BlogCards = () => {

 /*const handleClick = (_id) => {
    navigate(`/modify/${_id}`);
};*/ 


let navigate = useNavigate();

const [blogs, setBlogs] = useState([
{
_id: "1",
image: "https://via.placeholder.com/300x200",
title: "Blog Post 1",
username: "Author 1",
body: "The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform."
},

{
    _id: "2",
    image: "https://via.placeholder.com/300x200",
    title: "Blog Post 1",
    username: "Author 1",
    body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform."
    },
    {
      _id: "3",
      image: "https://via.placeholder.com/300x200",
      title: "Blog Post 1",
      username: "Author 1",
      body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform."
      },
      {
        _id: "4",
        image: "https://via.placeholder.com/300x200",
        title: "Blog Post 1",
        username: "Author 1",
        body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform."
        },
        {
          _id: "5",
          image: "https://via.placeholder.com/300x200",
          title: "Blog Post 1",
          username: "Author 1",
          body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform."
          },
          {
            _id: "6",
            image: "https://via.placeholder.com/300x200",
            title: "Blog Post 1",
            username: "Author 1",
            body: "This is an excerpt of the first blog post."
            },
            {
              _id: "7",
              image: "https://via.placeholder.com/300x200",
              title: "Blog Post 1",
              username: "Author 1",
              body: "This is an excerpt of the first blog post."
              },
              {
                _id: "8",
                image: "https://via.placeholder.com/300x200",
                title: "Blog Post 1",
                username: "Author 1",
                body: "This is an excerpt of the first blog post."
                },
                {
                  _id: "9",
                  image: "https://via.placeholder.com/300x200",
                  title: "Blog Post 1",
                  username: "Author 1",
                  body: "This is an excerpt of the first blog post."
                  },]);
                  const truncateBody = (body) => {
                    if (body.length > 100) {
                      return body.substring(0, 100) + "...";
                    }
                    return body;
                  }
                
                  return (
                    <div className="blog-container">
                      <div className="vertical-blog-list">
                        {blogs.map((blog) => (
                          
                          <div className="vertical-blog-card" key={blog._id} onClick={() => navigate("/blog-detail", {
                            state: {
                                blog: blog,
                                blogid:blog._id
    
    
                            }
                        })}>
                            <img src={blog.image} alt={blog.title} />
                            <div className="title-container">
                              <h3 className="title-font">{blog.title}</h3>
                            </div>
                            <div className="username-container">
                              <div className="blog-card-user">
                                <p className="author-name">{blog.username}</p>
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

/*import React, { useState } from "react";
import "./Blog.css";
import { useHistory } from "react-router-dom";

const BlogCards = () => {
const [blogs, setBlogs] = useState([
{
_id: "1",
image: "https://via.placeholder.com/300x200",
title: "Blog Post 1",
username: "Author 1",
body: "The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform."
},

{
    _id: "2",
    image: "https://via.placeholder.com/300x200",
    title: "Blog Post 1",
    username: "Author 1",
    body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform."
    },
    {
      _id: "3",
      image: "https://via.placeholder.com/300x200",
      title: "Blog Post 1",
      username: "Author 1",
      body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform."
      },
      {
        _id: "4",
        image: "https://via.placeholder.com/300x200",
        title: "Blog Post 1",
        username: "Author 1",
        body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform."
        },
        {
          _id: "5",
          image: "https://via.placeholder.com/300x200",
          title: "Blog Post 1",
          username: "Author 1",
          body: "This is an excerpt of the first blog post.The JDK includes tools for developing and testing programs written in the Java programming language and running on the Java platform."
          },
          {
            _id: "6",
            image: "https://via.placeholder.com/300x200",
            title: "Blog Post 1",
            username: "Author 1",
            body: "This is an excerpt of the first blog post."
            },
            {
              _id: "7",
              image: "https://via.placeholder.com/300x200",
              title: "Blog Post 1",
              username: "Author 1",
              body: "This is an excerpt of the first blog post."
              },
              {
                _id: "8",
                image: "https://via.placeholder.com/300x200",
                title: "Blog Post 1",
                username: "Author 1",
                body: "This is an excerpt of the first blog post."
                },
                {
                  _id: "9",
                  image: "https://via.placeholder.com/300x200",
                  title: "Blog Post 1",
                  username: "Author 1",
                  body: "This is an excerpt of the first blog post."
                  },]);
                 
                    const [hoveredCardId, setHoveredCardId] = useState(null);
                    const history = useHistory();
                  
                    const truncateBody = (body) => {
                      if (body.length > 100) {
                        return body.substring(0, 100) + "...";
                      }
                      return body;
                    };
                  
                    const handleMouseEnter = (id) => {
                      setHoveredCardId(id);
                    };
                  
                    const handleMouseLeave = () => {
                      setHoveredCardId(null);
                    };
                  
                    const handleClick = (id) => {
                      history.push(`/modify/${id}`);
                    };
                  
                    return (
                      <div className="blog-container">
                        <div className="vertical-blog-list">
                          {blogs.map((blog) => (
                            <div
                              className={`vertical-blog-card ${hoveredCardId === blog._id ? "hovered" : ""}`}
                              key={blog._id}
                              onMouseEnter={() => handleMouseEnter(blog._id)}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => handleClick(blog._id)}
                            >
                              <img src={blog.image} alt={blog.title} />
                              <div className="title-container">
                                <h3 className="title-font">{blog.title}</h3>
                              </div>
                              <div className="username-container">
                                <div className="blog-card-user">
                                  <p className="author-name">{blog.username}</p>
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
                  */