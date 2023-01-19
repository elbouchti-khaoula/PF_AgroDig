/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import LoadingButton from "@mui/lab/LoadingButton";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
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
import { COLORS } from "../utils/colors";
import { useMic } from "../contexts/MicContext";
import Scrollbars from "react-custom-scrollbars";
import PostBox from "./PostBox";
import PostNew from "./PostNew";
import { useTags } from "../contexts/TagContext";

function Mainconts() {
  const { posts, getPosts } = usePosts();

  const { user } = useAuth();
  const { isDark } = useApp();
  const { showMicModal, setShowMicModal } = useMic();

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

  const {getPostTags,postTags,blogTags, getBlogTags}= useTags();
  const [tags, setTags] = useState([]);

   useEffect(() => {
    
    getPostTags();
    getBlogTags()
    setTags([...postTags, ...blogTags]);

   }, [tags]);
  


  return (
    <div className="flex">
     
      {showMicModal ? <MicModal setShowMicModal={setShowMicModal} /> : null}
      <div className="w-full h-[91vh] overflow-auto flex flex-col items-center ">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className=" mobile:text-xl text-green-700">Popular Tags</h2>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "scroll",
              width: "80%",
              paddingLeft: "60px",
              paddingRight: "50px",
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag.id}
                style={{
                  backgroundColor: "#D3E7E2",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "3px",
                }}
              >
                <p>{tag.name}</p>
                
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
              <PostBox item={item} key={item.id} />
            ))}    

          </div>
        
        </>
      </div>
      <div style={{ flexBasis: "350px" }}>
        <Side />
      </div>
    </div>  
  );
}

export default Mainconts;
