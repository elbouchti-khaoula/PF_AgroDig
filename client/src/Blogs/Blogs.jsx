import React, {  useEffect, useMemo } from "react";
import {
	BiDotsHorizontalRounded,
	BiCommentDots,
	BiHeart,
	BiShare,
	BiSmile,
	BiSend,
} from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { getUserById, useAuth } from "../contexts/AuthContext";
import { useBlogs } from "../contexts/BlogContext";
import CommentsBox from "../others/CommentsBox";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Blogs = ({item}) => {
	const data = useAuth();
	const userd = data.user
	const [user, setUser] = React.useState(undefined);
	const [liked, setLiked] = React.useState(false);
	const [likesData, setLikesData] = React.useState(0);
	const { likeBlog, unlikeBlog, blogs, setBlogs, getCommentsByBlog,
		 getAllBlogDataById ,commentOnBlog, getLikesDataByBlog } = useBlogs();
	const [comments, setComments] = React.useState([]);
	const [showComments, setShowComments] = React.useState(false);
	const [comment, setComment] = React.useState("");
	const { isDark } = useApp()
	const [blogData, setBlogData] = React.useState(item);

	const timeFromNow = moment(blogData?.date).fromNow();

	const blogerImage =async(userID) => {
		const user = await getUserById(userID)
		setUser(user);
	}

	const getComments = async() => {
		const comments = await getCommentsByBlog(blogData._id)
		console.log(comments);
		setComments(comments.comments)
	}

	const handleLike = () => {
		if (liked) {
			unlikeBlog(blogData._id);
			setBlogs(blogs.map((blog) => {
				if (blog._id === blogData._id) {
					return {
						...blog,
						likes: blog.likes - 1,

					}
				}
				return blog;
			}));
		}else{
			likeBlog(blogData._id);
			setBlogs(blogs.map((blog) => {
				if (blog._id === blogData._id) {
					return {
						...blog,
						likes: blog.likes + 1,

					}
				}
				return blog;
			}));
		}
		setLiked(!liked);
	}

	const handleComment = async() => {
		if(comment.trim() === "") return
		await commentOnBlog(blogData._id, comment);
		setBlogData({...blogData, comments: blogData.comments + 1});
		setComment("");
	}

	useMemo(() => {
		blogerImage(blogData.user);
	}, []);

	const getLikesData = async () => {
		const likesData = await getLikesDataByBlog(blogData._id);
		setLikesData(likesData.likedata);
	}

	const knowIfLiked = async () => {
		for (let i = 0; i < likesData.length; i++) {
			if (likesData[i].user === userd._id) {
				setLiked(true);
				// console.log(likesData[i].user, user?._id);
			}
		}
	}
	useEffect(() => {
		getLikesData();
	}, []);

	useEffect(() => {
		knowIfLiked();
	}, [likesData]);

	return (
		<>
				<div
					key={blogData?._id}
					className={`w-[98%] mobile:w-[70%] mobile:min-w-[365px] xtab:w-[60%]  items-center mt-6 ${
						isDark && "text-white"
					}`}
				>
					{showComments && (
						<CommentsBox
							setShowComments={setShowComments}
							comments={comments}
							getComments={getComments}
							user={user}
						/>
					)}
					<div className="blogcard px-4 flex flex-col justify-between rounded-sm shadow-sm py-[1%] border-[1px] aspect-[9/10]">
						<div className="flex items-center justify-between">
							<Link to={`/profile/${user?._id}`} className="flex items-center">
								<div className="w-[50px] rounded-full h-[50px] overflow-hidden">
									<LazyLoadImage
										className="min-h-full min-w-full object-cover"
										src={user?.profile}
										alt=""
									/>
								</div>
								<div className="flex ml-2 flex-col my-auto">
									<p>{user?.username} </p>
									<span className="text-sm opacity-[0.7] w-full flex whitespace-nowrap">
										{timeFromNow}
									</span>
									{/* <Moment fromNow ago>{postData.date}</Moment> */}
								</div>
							</Link>
							<BiDotsHorizontalRounded className="cursor-pointer text-3xl" />
						</div>
						<div className="flex flex-col w-full">
							<div className="w-full flex flex-wrap items-start">
								<p className="my-1">{blogData.caption}</p>
							</div>
							<div
								className={` aspect-square h-full max-h-[60vh] flex items-center justify-center bg-transparent border-[1px] ${
									isDark && "border-[#0a061c]"
								}`}
							>
								<LazyLoadImage
									className="max-w-full pointer-events-none h-full"
									src={blogData.image_url}
									alt=""
								/>
							</div>
						</div>
						<div className=" flex items-center text-2xl py-2">
							{liked ? (
								<div className="flex items-center">
									<FaHeart
										onClick={handleLike}
										className="ml-4 cursor-pointer text-red-600"
									/>
									<p className="text-sm ml-2">{blogData.likes}</p>
								</div>
							) : (
								<div className="flex items-center">
									<BiHeart
										onClick={handleLike}
										className="ml-4 cursor-pointer"
									/>
									<p className="text-sm ml-2">{blogData.likes}</p>
								</div>
							)}
							<div className="flex items-center">
								<BiCommentDots
									onClick={() => setShowComments(true)}
									className="ml-4 cursor-pointer"
								/>
								<p className="text-sm ml-2">{blogData.comments}</p>
							</div>
							{/* <BiShare className="ml-4 cursor-pointer" /> */}
						</div>
						<div className="flex py-1 px-2 items-center rounded-3xl border-[2px]">
							<BiSmile className="text-2xl cursor-pointer" />
							<textarea
								onChange={(e) => setComment(e.target.value)}
								className="bg-transparent h-[30px] outline-none px-2 w-full max-h-[20vh] min-h-[4vh]"
								type="text"
								value={comment}
								maxLength={255}
								placeholder="Add a comment"
							/>
							<BiSend
								onClick={handleComment}
								className="text-2xl cursor-pointer"
							/>
						</div>
					</div>
				</div>
		</>
	);
};

export default Blogs;
