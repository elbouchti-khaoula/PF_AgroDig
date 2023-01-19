import React, { useState } from 'react';
import "./Post.css";
const PostPage = () => {
  const [post, setPost] = useState({
    text: 'This is my post',
    user: {
      name: 'John Doe',
      image: 'https://via.placeholder.com/150',
    },
    likes: 0,
    comments: [
      { text: 'Great post!', likes: 0 },
      { text: 'I agree', likes: 0 },
    ],
  });

  const handleLikeClick = () => {
    setPost({
      ...post,
      likes: post.likes + 1,
    });
  };

  const handleCommentLikeClick = (index) => {
    const newComments = [...post.comments];
    newComments[index].likes += 1;
    setPost({
      ...post,
      comments: newComments,
    });
  };

  return (
    <div>
      <img src={post.image} alt={post.user.name} style={{ width: '100%' }} />
      <div>
        <h2>{post.user.name}</h2>
        <p>{post.text}</p>
        <button onClick={handleLikeClick}>Like</button>
        <p>Likes: {post.likes}</p>
      </div>
      <div>
        {post.comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
            <button onClick={() => handleCommentLikeClick(index)}>Like</button>
            <p>Likes: {comment.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
