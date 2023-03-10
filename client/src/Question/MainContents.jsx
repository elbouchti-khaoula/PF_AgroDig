import {
  Button,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { COLORS } from "../utils/colors";
import profileIcon from "../Home/Images/profileIcon.png";
import Side from "../Home/side";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../contexts/PostContext";
import { useEffect } from "react";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";

const MainContents = () => {
  const { user } = useAuth();

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },

    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];

  const defaultValues = {
    body: "",
    userId: user.id,
  };

  const [showAddComment, setshowAddComment] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  const [voteRequestDto, setvoteRequestDto] = useState({
    isPositive: false,
    userId: user.id,
  });

  const [downvoteRequestDto, setdownvoteRequestDto] = useState({
    isPositive: false,
    userId: user.id,
  });
  const [load, setload] = useState(false);
  let { id } = useParams();

  const {
    post,
    getPostById,
    commentPost,
    getCommentsByPost,
    comments,
    likePost,
    setpost
  } = usePosts();

  useEffect(() => {
    likePost(voteRequestDto,post.id);
  }, [voteRequestDto]);

  useEffect(() => {
    likePost(downvoteRequestDto,post.id);
  }, [downvoteRequestDto]);

  const handleLike = () => {
    const req = {
      isPositive: true,
      userId : user.id
    }
    setvoteRequestDto(req);

  setpost( (prev) => ({
			...prev,
			upVoteCount : prev.upVoteCount + 1
		})
      
   );
    
  };

  const handleDislike = () => {
    const req = {
      isPositive: false,
      userId : user.id
    }
    setdownvoteRequestDto(req);
    

    setpost( (prev) => ({
			...prev,
			downVoteCount : prev.downVoteCount + 1
		})
      
   );

  };

  
  const submitComment = (e) => {
    commentPost(formValues, post.id);
    setshowAddComment(false);
    setload(true);
  };

  useEffect(() => {
    getPostById(id);
  }, []);

  useEffect(() => {
    getCommentsByPost(id);
  }, [load]);

  const timeFromNow = moment(post?.creationDate).fromNow();

  const handleBodyChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues((prev) => ({
      ...prev,
      files: file,
    }));
    console.log(formValues.files);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        className="w-full h-[91vh] overflow-auto flex flex-col items-center "
        style={{ gap: "15px" }}
      >
        <div>
          <Box
            style={{
              height: "fit-content",
              width: "100vh",
              backgroundColor: "#C3E4A4",
              padding: "20px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Stack
                  direction="row"
                  style={{ width: "30px", height: "30px" }}
                  spacing={2}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <LazyLoadImage
                    className="object-cover"
                    style={{ width: "20px", height: "20px" }}
                    src={profileIcon}
                    alt=""
                  />
                  <Typography>{post?.poster?.username}</Typography>
                  <Typography fontSize={8}>{timeFromNow}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={10}></Grid>
              <Grid item xs={12}>
                <Typography fontSize={36}>{post?.title}</Typography>
              </Grid>

              <Grid item xs={12}>
                <p
                  style={{
                    backgroundColor: "#F5FFFD",
                    padding: "4px",
                    borderRadius: "2%",
                    width: "100%",
                  }}
                >
                  {post?.body}
                </p>
              </Grid>
              <Grid item xs={12}>
                {post?.tagNames?.map((tag) => (
                  <Box
                    style={{
                      padding: "3px",
                      borderRadius: "2%",
                      backgroundColor: COLORS.myDarkGreen,
                      width: "fit-content",
                      color: "#FFFFFF",
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Grid>

              <Grid item xs={12}>
                <ImageList
                  gap={8}
                  sx={{ width: 500, height: "fit-content" }}
                  cols={4}
                  rowHeight={100}
                >
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            </Grid>
          </Box>
          
                    
          <Box
            style={{
              height: "fit-content",
              width: "100vh",
              backgroundColor: "#FFFFFF",
              padding: "1px",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
              style={{ justifyContent: "space-around", alignItems: "baseline" }}
            >
              <IconButton style={{ color: "#404040" }} aria-label="like" onClick={handleLike}>
                <KeyboardArrowUpIcon />
                <span style={{ fontSize: 9, paddingLeft: "4px" }}>
                  {post?.upVoteCount}
                </span>
              </IconButton>
              <IconButton style={{ color: "#404040" }} aria-label="like" onClick={handleDislike}>
                <KeyboardArrowDownIcon />
                <span style={{ fontSize: 9, paddingLeft: "4px" }}>
                  {post?.downVoteCount}
                </span>
              </IconButton>
              <Typography>
                <span style={{ color: COLORS.myDarkGreen }}>
                  {post?.commentCount}
                </span>
                Replies
              </Typography>
              <Button
                size="small"
                style={{ color: COLORS.myDarkGreen }}
                onClick={() => {
                  setshowAddComment(!showAddComment);
                  console.log(id);
                }}
              >
                Add new reply
              </Button>
            </Stack>
          </Box>
        </div>

        {showAddComment && (
          <Grid
            container
            style={{
              height: "fit-content",
              width: "100vh",
              backgroundColor: "#FFFFFF",
              padding: "14px",
            }}
          >
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: "bold" }}> New reply</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="body"
                name="body"
                value={formValues.body}
                onChange={handleBodyChange}
                label="Multiline"
                multiline
                fullWidth
                rows={3}
                maxRows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="column">
                {/* <label htmlFor="formFileSm" className="form-label">
                   filename
                  </label> */}
                <input
                  type="file"
                  name="myFile"
                  onChange={handleFileChange}
                  style={{
                    backgroundColor: COLORS.myLightGreen,
                    marginTop: "6px",
                  }}
                  id="formFileSm"
                />
              </Stack>

              <div className="mb-3" style={{ fontSize: 10, color: "#232F49" }}>
                Formats possible : png, jpeg, jpg, tiff,gif
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "end" }}
            >
              <Button
                size="small"
                style={{
                  color: COLORS.myGreen,
                  borderColor: COLORS.myGreen,
                  marginTop: "3px",
                }}
                variant="outlined"
                type="submit"
                onClick={submitComment}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        )}
        {comments.map((comment) => (
          <Box
            style={{
              height: "fit-content",
              width: "100vh",
              backgroundColor: "#FFFFFF",
              padding: "20px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Stack
                  direction="row"
                  spacing={2}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <LazyLoadImage
                    className="object-cover"
                    style={{ width: "30px", height: "30px" }}
                    src={profileIcon}
                    alt=""
                  />
                  <Typography>{comment.commenter.username}</Typography>
                  <Typography>{comment.createdAt}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={10}></Grid>

              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <p>{comment.body}</p>
                </Box>
                <Box className="flex  flex-col justify-around">
                  <div className="flex  justify-between">
                 
                    <IconButton
                      style={{ color: "#404040" }}
                      aria-label="like"
                     
                    >
                      <ThumbUpIcon />
                      <span style={{ fontSize: 9, paddingLeft: "4px" }}>
                        {comment.upVoteCount}
                      </span>
                    </IconButton>
                    <IconButton
                      style={{ color: "#404040" }}
                      aria-label="dislike"
                    >
                      <ThumbDownIcon />
                      <span style={{ fontSize: 9, paddingLeft: "4px" }}>
                        {comment.downVoteCount}
                      </span>
                    </IconButton>
                  </div>
                  <Divider />

                  <div>
                    <Rating
                      name="read-only"
                      value={comment.upVoteCount % 5}
                      readOnly
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </div>
      <div style={{ flexBasis: "350px" }}>
        <Side />
      </div>
    </div>
  );
};

export default MainContents;
