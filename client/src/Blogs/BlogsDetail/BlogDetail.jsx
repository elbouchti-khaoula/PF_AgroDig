import { Divider, Grid, IconButton, ImageList, ImageListItem, Rating, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { COLORS } from "../../utils/colors";
import profileIcon from "../../Home/Images/profileIcon.png";
import Side from "../../Home/side";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const BlogDetail= (props) => {

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
  const params = useLocation();
  let id = params.state.blog.id;

  return (
    <div style={{ display: "flex" }}>
<div
        className="w-full h-[91vh] overflow-auto flex flex-col items-center "
        style={{ gap: "15px" }}
      >
        <Box
          style={{
            height: "fit-content",
            width: "100vh",
            backgroundColor: COLORS.myLightGreen,
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
                  style={{ width: "30px",height:"30px" }}
                  src={profileIcon}
                  alt=""
                />
                <Typography >{params.state.blog.poster.username}</Typography>
                <Typography>{params.state.blog.creationDate}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold" fontSize={29}>{params.state.blog.title}</Typography>
            </Grid>

            <Grid item xs={12}>
            {params.state.blog.body}
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
            padding: "20px",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Typography>
              <span style={{ color: COLORS.myDarkGreen }}>
                {/* {params.state.blog.commentCount}  */}
                1
                </span>Replies
            </Typography>
          </Stack>
        </Box>
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
                  style={{ width: "30px" }}
                  src={profileIcon}
                  alt=""
                />
                <Typography>{params.state.blog.username}</Typography>
                <Typography>23/223/23</Typography>
              </Stack>
            </Grid>
            <Grid item xs={10}></Grid>

            <Grid
              item
              xs={12}
              style={{ display: "flex", flexDirection: "row", gap: "10px" }}
            >
              <Box>
                <p>
                {params.state.blog.body}
                </p>
              </Box>
              <Box className="flex  flex-col justify-around">
                <div className="flex  justify-between">
                  <IconButton style={{ color: "#404040" }} aria-label="like">
                    <ThumbUpIcon />
                    <span style={{ fontSize: 9, paddingLeft: "4px" }}>
                      {/* {postData.upVoteCount} */}2
                    </span>
                  </IconButton>
                  <IconButton style={{ color: "#404040" }} aria-label="dislike">
                    <ThumbDownIcon />
                    <span style={{ fontSize: 9, paddingLeft: "4px" }}>
                      {/* {postData.downVoteCount} */}1
                    </span>
                  </IconButton>
                </div>
                <Divider />

                <div>
                  <Rating name="read-only" value={2} readOnly />
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div style={{ flexBasis: "350px" }}>
        <Side />
      </div>
    </div>
  );
};

export default BlogDetail;
