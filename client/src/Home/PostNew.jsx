
import React, { useCallback, useEffect, useMemo } from "react";
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
import { usePosts } from "../contexts/PostContext";
import CommentsBox from "../others/CommentsBox";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Divider, IconButton, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { COLORS } from "../utils/colors";

const PostNew = ({ item }) => {
  const [postData, setPostData] = React.useState(item);
  const [stars, setStars] = React.useState(2);
  const handleClick = (newValue) => {
    setStars(newValue);
  };
  const { isDark } = useApp();

  return (
    <>
      <div
        key={postData?.id}
        className={`w-[100%] mobile:w-[70%] mobile:min-w-[365px] xtab:w-[95%]  items-center mt-6 ${
          isDark && "text-white"
        }`}
        
      >
        
        {/* {showComments && (
              <CommentsBox
                setShowComments={setShowComments}
                comments={comments}
                getComments={getComments}
                user={user}
              />
            )} */}
        <div
          style={{ border: "none" }}
          className="postcard px-3 flex flex-col justify-between rounded-sm shadow-sm py-[1%] border-[1px] "
        >
          {/* poster user area */}
          <div className="flex items-center justify-between">
            {/* <Link to="/" className="flex items-center">
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
                   <Moment fromNow ago>{postData.date}</Moment> 
                  </div>
                </Link> */}
            <BiDotsHorizontalRounded className="cursor-pointer text-3xl" />
          </div>
          {/* end poster user area */}

          {/* photo area */}
          <div className="flex w-full gap-2">
            <div
              style={{ flexBasis: "250px" }}
              className={` aspect-square h-full max-h-[60vh] flex items-center justify-center bg-transparent border-[1px] ${
                isDark && "border-[#0a061c]"
              }`}
            >
              {/* <LazyLoadImage
                    className="max-w-full pointer-events-none h-full"
                    src={postData.image_url}
                    alt=""
                  /> */}
            </div>
            <div className="w-full flex flex-col flex-wrap items-start ">
              <Box
                sx={{
                  padding: "10px",
                  border: 1,
                  height: "100%",
                  borderRadius: "16px",
                  borderColor: "#8AA842",
                  width: "100%",
                }}
              >
                <Typography color="#1B1B1B" variant="h5">
                  {postData.title}
                </Typography>
                <p style={{ fontSize: 11 }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi iste quae ea sit officiis ipsam quam c
                </p>
              </Box>
            </div>
            <div className="w-full" style={{ flexBasis: "90px" }}>
              <Box
                className="flex  flex-col justify-around"
                sx={{
                  padding: "10px",
                  height: "100%",
                  width: "100%",
                  borderRadius: "16px",
                  backgroundColor: COLORS.myLightGreen,
                }}
              >
                <div className="flex  justify-between">
                  <IconButton style={{ color: "#404040" }} aria-label="like">
                    <ThumbUpIcon />
                    <span style={{ fontSize: 9, paddingLeft: "4px" }}>23</span>
                  </IconButton>
                  <IconButton style={{ color: "#404040" }} aria-label="dislike">
                    <ThumbDownIcon />
                    <span style={{ fontSize: 9, paddingLeft: "4px" }}>3</span>
                  </IconButton>
                </div>
                <Divider />

                <div>
                  <Rating
                    name="editable"
                    value={stars}
                    onClick={(value) => handleClick(value)}
                  />
                </div>
              </Box>
            </div>
          </div>
          {/* end Photo area */}

          {/* Likes and comments */}
          <div
            className=" flex items-center text-2xl py-2"
            style={{ marginLeft: "auto" }}
          >
            <div
              className="bg-gray-300 text-gray p-1 rounded-lg flex-shrink-0"
              style={{ width: "fit-content" }}
            >
              <p className="text-sm ml-2">#Tag</p>
            </div>

            <div
              className="flex items-center mycmt-container"
              style={{
                flexDirection: "row-reverse",
                justifyContent: "space-between",
              }}
            >
              {/* <p className="text-sm ml-2">{postData.comments}</p> */}
              {/* <BiCommentDots
                onClick={() => setShowComments(true)}
                className="ml-4 cursor-pointer"
              /> */}
            </div>

            {/* <BiShare className="ml-4 cursor-pointer" /> */}
          </div>

          {/* end Likes and comments */}

          {/* Add comment case */}
          <div className="flex py-1 px-2 items-center rounded-3xl border-[2px]">
            <BiSmile className="text-2xl cursor-pointer" />

            {/* <textarea
              onChange={(e) => setComment(e.target.value)}
              className="bg-transparent h-[30px] outline-none px-2 w-full max-h-[20vh] min-h-[4vh]"
              type="text"
              value={comment}
              maxLength={255}
              placeholder="Add a comment"
            /> */}
            {/* <BiSend
              onClick={handleComment}
              className="text-2xl cursor-pointer"
            /> */}
          </div>
          {/* end Add comment case */}
        </div>
      </div>
    </>
  );
};

export default PostNew;
