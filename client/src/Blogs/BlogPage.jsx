import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useBlogs } from "../contexts/BlogContext";
import Layout from "../others/Layout";
import { COLORS } from "../utils/colors";
import BlogCard from "./BlogCard";

function BlogPage() {
  const { getBlogs, blogs } = useBlogs();

  let navigate = useNavigate();

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Layout active={"home"}>
      <div className="w-full h-[91vh] overflow-auto flex flex-col items-center ">
        <Grid container spacing={4} style={{ margin: "4px" }}>
          <Grid item xs={12}>
            <Paper
              style={{
                width: "100%",
                minHeight: "fit-content",
                height: "200px",
                backgroundColor: COLORS.myGreen,
              }}
            >
              <Typography
                fontWeight="bold"
                align="center"
                fontSize={23}
                style={{ paddingTop: "40px" }}
                color="whitesmoke"
              >
                Bienvenu dans l'espace de Blogs !
              </Typography>

              <Typography
                fontWeight="bold"
                align="center"
                style={{ paddingTop: "10px" }}
              >
                Echanger et partager votre savoir avec une communauté d'experts,
                et d'agriculteurs passionées.
              </Typography>
            </Paper>
          </Grid>
          {blogs.map((blog) => (
            <Grid item xs={4}>
              <Button
                onClick={() =>
                  navigate("/blog-detail", {
                    state: {
                      blog: blog,
                      blogid: blog.id,
                    },
                  })
                }
              >
                <BlogCard blog={blog} />
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export default BlogPage;
