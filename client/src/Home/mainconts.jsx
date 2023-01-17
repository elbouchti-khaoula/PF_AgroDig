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
import Scrollbars from 'react-custom-scrollbars';

function Mainconts() {

  const { posts, getPosts } = usePosts();
  const { user } = useAuth();
  const { isDark } = useApp();
  const {showMicModal,setShowMicModal} = useMic();
  const [tags, setTags] = useState([
    {tag: '#Tag1', count: 100},
    {tag: '#Tag2', count: 90},
    {tag: '#Tag3', count: 80},
    {tag: '#Tag4', count: 70},
    {tag: '#Tag5', count: 60},
    {tag: '#Tag1', count: 100},
    {tag: '#Tag2', count: 90},
    {tag: '#Tag3', count: 80},
    {tag: '#Tag5', count: 60}
]);
  const [showTags, setShowTags] = useState(false);
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
        
      <div style={{ display: "flex", justifyContent: "space-between" }}>
          
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'scroll',
                width: "80%",
                paddingLeft: '60px',
                paddingRight: '50px'
            }}
            >
              {tags.map((tag) => (
                <div
                  key={tag.tag}
                  style={{
                    backgroundColor: "#D3E7E2",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "20px",
                  }}
                >
                  <p>{tag.tag}</p>
                  <p>{tag.count} post</p>
                </div>
              ))}
            </div>
          
         
        </div>
<div>
<Link to="/form-post">
            <Button
              variant="contained"
              sx={{
                //backgroundColor: COLORS.myGreen,
                backgroundColor: "#A9CAAA",
                marginTop: "20px",
                marginRight: "26px",
                marginLeft: "auto",
              }}
              onClick={() => setShowTags(!showTags)}
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