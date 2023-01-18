import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getCookie } from "./RequireAuth";
import configData from '../Config.json';

const BlogContext = React.createContext();

export const useBlogs = () => {
	return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
	const [blogs, setBlogs] = useState([]);
	const [userBlogs, setUserBlogs] = useState(null);
	const { user } = useAuth();


	const getBlogs = async () => {
		const endpoint = configData.BLOG_SERVICE_URL;
		const res = await fetch(
			`${endpoint}`,
			{
				method: "GET",

				// headers: {
				// 	"Content-Type": "application/json",
				// 	authorization: "Bearer " + getCookie("token"),
				// },
			}
		);
		const blogs = await res.json();
		setBlogs(blogs);
		return blogs;
	};

	const newBlog = async (blogData) => {
		const endpoint = configData.BLOG_SERVICE_URL;
		const formData  = new FormData();
		
		// for(const name in blogData ) {
		// 	formData.append(name, blogData[`${name}`]);
		//   }
		//  console.log("form waaaa daaaaaaaaayta "+formData.get(body));
		formData.append('title', blogData.title);
		formData.append('body', blogData.body);
		const reaally = typeof blogData.attachements !== 'undefined';
		//console.log("loging attachements in blogContext : " + blogData.attachements + " reaaaally  " + reaally);
		reaally ? formData.append('attachements', blogData.attachements) : console.log(" no file present ") ;
		formData.append('tagIds', blogData.tagIds);
		formData.append('userId',user.id)
		//const res = 
		
		fetch(`${endpoint}`, {
			method: "POST",
			// headers : {
			// 	"Content-Type": "multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p"
			// },
			body: formData
		}).then((res) => {
			if (res.status == 201 ) {
			  alert("Created ! ");
			  
			}
			// } else if (res.status == 401) {
			//   alert("Oops! ");
			// }
		  },
		   (err) => {
			alert("Error submitting form!");
		  });
		  return true;

		
		//await res.json();

		//await getBlogs();
		
	};

	const deleteBlog = async (id) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/delete/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const data = await res.json();
		setBlogs(data.blogs.reverse());
		setLoader(false);
		return blogs;
	};

	const commentOnBlog = async (blogID, comment) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/commentOnBlog/${blogID}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
				body: JSON.stringify({
					blogID,
					comment,
				}),
			}
		);
		const data = await res.json();

		return blogs;
	};

	const likeBlog = async (blogID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/like/${blogID}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const data = await res.json();

		return blogs;
	};

	const getCommentsByBlog = async (blogID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/getCommentsByBlogs/${blogID}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const data = await res.json();
		console.log(data);
		return data;
	};

	const getLikesDataByBlog = async (blogID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/getLikesDataByBlog/${blogID}`,
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

	const getLikesCountByBlog = async (blogID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/getLikeCountByBlog/${blogID}`,
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

	const unlikeBlog = async (blogID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/unlikeBlog/${blogID}`,
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

	const updateCommentOnBlog = async (blogID, commentID, comment) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/updateCommentOnBlog/${blogID}`,
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

	const updateBlog = async (plogID, imageStr, caption) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/updateBlog/${blogID}`,
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

		setBlogs(data.blogs.reverse());
		return data;
	};

	const getBlogsByFollowing = async () => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/getBlogsByFollowing`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + getCookie("token"),
				},
			}
		);
		const data = await res.json();

		setBlogs(data.blogs.reverse());
		return data;
	};

	const getAllBlogDataById = async (blogID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/getAllBlogData/${blogID}`,
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

	const deleteComment = async (blogID, commentID) => {
		const res = await fetch(
			`https://photocorner33.onrender.com/blog/deleteComment/${blogID}`,
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

	return (
		<BlogContext.Provider
			value={{
				blogs,
				setBlogs,
				getBlogs,
				newBlog,
				deleteBlog,
				deleteComment,
				commentOnBlog,
				likeBlog,
				getAllBlogDataById,
				getCommentsByBlog,
				getLikesDataByBlog,
				getLikesCountByBlog,
				unlikeBlog,
				updateCommentOnBlog,
				updateBlog,
				getBlogsByFollowing,
				userBlogs,
				setUserBlogs,
			}}
		>
			{children}
		</BlogContext.Provider>
	);
};
