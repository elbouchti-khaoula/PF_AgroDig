import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getCookie } from "./RequireAuth";

import configData from "../Config.json";
import axios from "axios";


const PostContext = React.createContext();

export const usePosts = () => {
	return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);
	const [post, setpost] = useState({});
	const [userPosts, setUserPosts] = useState(null);
	const [comments, setcomments] = useState([]);
	const { user } = useAuth();

	const getPosts = async () => {
		const res = await fetch(
			configData.POST_SERVICE_URL,
			{
				method: "GET",

				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const posts = await res.json();
		setPosts(posts);
		// setLoader(false);
		return posts;
	};


	const newPost = async (postData) => {
		const endpoint = configData.POST_SERVICE_URL;
		const formData  = new FormData();
		formData.append('title', postData.title);
		formData.append('body', postData.body);
		const reaally = typeof postData.files !== 'undefined';
		//console.log("loging files in blogContext : " + postData.files + " reaaaally  " + reaally);
		reaally ? formData.append('files', postData.files) : console.log(" no file present ") ;
		formData.append('tagIds', postData.tagIds);
		formData.append('userId',user.id)
		//const res = 
		
		fetch(`${endpoint}`, {
			method: "POST",
			body: formData
		}).then((res) => {
			if (res.status == 201 ) {
			  alert("Created ! ");
			  
			}
		  },
		   (err) => {
			alert("Error submitting form!");
		  });
		  return true;
		
	};




	// const newPost = async (caption, imageStr) => {
	// 	const res = await fetch("https://photocorner33.onrender.com/post/newPost", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			authorization: "Bearer " + getCookie("token"),
	// 		},
	// 		body: JSON.stringify({
	// 			imageStr: imageStr,
	// 			caption,
	// 		}),
	// 	});
	// 	await res.json();
	// 	await getPosts();
	// 	return true;
	// };







	const deletePost = async (id) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/post/delete/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const data = await res.json();
		setPosts(data.posts.reverse());
		setLoader(false);
		return posts;
	};

	const commentOnPost = async (postID, comment) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/post/commentOnPost/${postID}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
				body: JSON.stringify({
					postID,
					comment,
				}),
			}
		);
		const data = await res.json();

		return posts;
	};

	const likePost = (voteRequestDto,postId) => {
		 console.log(voteRequestDto);
		axios.post(`${configData.POST_SERVICE_URL}` +"/vote", voteRequestDto,{params:{postId : postId}}).then(
		  (res) => {	
			console.log(res.data);
		  },
		  (err) => {	
			console.error(err);
		  }
		);
	  };

	const getCommentsByPost = (postId)=>{
		axios.get(`${configData.POST_SERVICE_URL}` + "/comments",{params:{postId : postId}}).then(
		   (res) => {
			   console.log(`i made the request with ${postId}`);
			   console.log(res.data);
			   const arr = res.data.reverse();
			   setcomments(arr);
			
			 },
			 (err) => {
			   console.error("error in getting comments postbyId");
			 }
	   );
	   };

	const getLikesDataByPost = async (postID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/post/getLikesDataByPost/${postID}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const data = await res.json();

		return data;
	};

	const getLikesCountByPost = async (postID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/post/getLikeCountByPost/${postID}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const data = await res.json();

		return data;
	};

	const unlikePost = async (postID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/post/unlikePost/${postID}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const data = await res.json();

		return data;
	};

	const updateCommentOnPost = async (postID, commentID, comment) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/post/updateCommentOnPost/${postID}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
				body: JSON.stringify({
					commentID,
					comment,
				}),
			}
		);
		const data = await res.json();

		return data;
	};

	const updatePost = async (postID, imageStr, caption) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/post/updatePost/${postID}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
				body: JSON.stringify({
					imageStr,
					caption,
				}),
			}
		);
		const data = await res.json();

		setPosts(data.posts.reverse());
		return data;
	};

	const getPostsByFollowing = async () => {
		const res = await fetch(
			`https://photocorner33.onrender.com/post/getPostsByFollowing`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const data = await res.json();

		setPosts(data.posts.reverse());
		return data;
	};

	const getAllPostDataById = async (postID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/post/getAllPostData/${postID}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const data = await res.json();

		return data;
	};

	const deleteComment = async (postID, commentID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/post/deleteComment/${postID}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
				body: JSON.stringify({
					commentID,
				}),
			}
		);
		const data = await res.json();

		return data;
	};

	const   getPostById = (postId)=>{
		axios.get(`${configData.POST_SERVICE_URL}` + "/" + `${postId}`).then(
		   (res) => {
			   console.log(`i made the request with ${postId}`);
			   console.log(res.data);
			   setpost(res.data);

			 },
			 (err) => {
			   console.error("error in getting postbyId");
			 }
	   );

	   };

	   const commentPost = (formValues,postId) => {
		console.log(formValues);
		const formData  = new FormData();
		formData.append('body', formValues.body);
		formData.append('userId', formValues.userId);
		axios.post(`${configData.POST_SERVICE_URL}` +"/comment", formData,{params:{postId : postId}}).then(
		  (res) => {	
			console.log(res.data);
		  },
		  (err) => {	
			console.error(err);
		  }
		);
	  };		
	return (
		<PostContext.Provider
			value={{
				comments,
				setcomments,
				commentPost,
				getPostById,
				post,
				setpost,	
				posts,			
				setPosts,
				getPosts,
				newPost,
				deletePost,
				deleteComment,
				commentOnPost,
				likePost,
				getAllPostDataById,
				getCommentsByPost,
				getLikesDataByPost,
				getLikesCountByPost,
				unlikePost,
				updateCommentOnPost,
				updatePost,
				getPostsByFollowing,
				userPosts,
				setUserPosts,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};
