/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import "./Home.css";
import Side from "./side";
import Post from "./Post";
import { usePosts } from "../contexts/PostContext";
import { BiImageAdd, BiPhotoAlbum, BiX } from "react-icons/bi";
import { useApp } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import MicModal from "./MicModal";
import {COLORS} from "../utils/colors";
import { useMic } from "../contexts/MicContext";
import TagH from "./TagH";
function Mainconts() {

  const { posts, getPosts } = usePosts();
  const { user } = useAuth();
  const { isDark } = useApp();
  const {showMicModal,setShowMicModal} = useMic();

  useMemo(() => {
    if (posts.length === 0) {
      getPosts();
    }
  }, []);

  useCallback(() => {
    console.log("fetching posts");
    getPosts();
  }, []);

  return (
    <div className="flex">
      {showMicModal ? <MicModal setShowMicModal={setShowMicModal} /> : null}
      <div className="w-full h-[91vh] overflow-auto flex flex-col items-center ">
        {/* <div className="flex items-center mobile:w-3/3 w-4/5  max-w-[600px] mx-auto justify-center mt-4 min-w-[150px]">
          <Link to={`/profile`} className="flex items-center">
            <div className="flex overflow-hidden w-[40px] h-[40px] rounded-full">
              <img
                className="min-w-full min-h-full object-cover"
                src={user.profile}
                alt=""
              />
            </div>
          </Link>
          <button
            onClick={() => setShowMicModal(true)}
            className={`text-whi ml-1 border-2 truncate border-gray-500/50 w-10/12 text-start rounded-3xl ${
              isDark
                ? "bg-[#08021d] hover:bg-slate-800"
                : "bg-slate-300 hover:bg-slate-400"
            } px-4 py-2
						cursor-pointer`}
          >
            {user.username}, Create a New Post
          </button>
        </div> */}
   
<div><Link to='/form-post'>
        <Button
          variant="contained"
          sx={{ backgroundColor: COLORS.myGreen, marginTop:"20px", marginRight:"26px",marginLeft: "auto" }}
        >
          New Post
        </Button>
      </Link>
    </div>

        <>
          <div className="w-full flex flex-col items-center">
            {posts.map((item) => (
              <Post item={item} key={item._id} />
            ))}
          </div>
        </>
      </div>
	  <div style={{flexBasis:"350px"}}>
      <Side />
	  </div>
    </div>
  );
}

export default Mainconts;
