import { Divider, Grid, IconButton, Rating, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { COLORS } from "../utils/colors";
import profileIcon from "../Home/Images/profileIcon.png";
import Side from "../Home/side";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const MainContents = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
                  style={{ width: "30px" }}
                  src={profileIcon}
                  alt=""
                />
                <Typography>User</Typography>
                <Typography>22/223/23</Typography>
              </Stack>
            </Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={12}>
              <Typography fontSize={36}>Question title</Typography>
            </Grid>

            <Grid item xs={12}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              ipsum, sequi nobis soluta esse, explicabo est voluptatum aliquam
              maxime architecto voluptas pariatur, quidem nemo sapiente dolorem
              corrupti natus accusantium quae.
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
              <span style={{ color: COLORS.myDarkGreen }}>34 </span>Replies
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
                <Typography>User</Typography>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  ipsum, sequi nobis soluta esse, explicabo est voluptatum
                  aliquam maxime architecto voluptas pariatur, quidem nemo
                  sapiente dolorem corrupti natus accusantium quae.
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

export default MainContents;
