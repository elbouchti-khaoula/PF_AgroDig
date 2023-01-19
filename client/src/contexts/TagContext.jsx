import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getCookie } from "./RequireAuth";
import configData from '../Config.json';

const TagContext = React.createContext();

export const useTags = () => {
    return useContext(TagContext);
};

export const TagProvider = ({ children }) => {
    const [blogTags, setBlogTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
   // const [userTags, setUserTags] = useState(null);
   //  const { user } = useAuth();
   const [posttags, setposttags] = useState([]);

    const getBlogTags = async () => {
        const endpoint = configData.BLOG_SERVICE_URL+"/tags"
        const res = await fetch(
           `${endpoint}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + getCookie("token"),
                },
            }
        );
        const data = await res.json();
        setBlogTags(data);
        console.log(data);
    };

    const getPostTags = async () => {
        const endpoint = configData.POST_SERVICE_URL+"/tags"
        const res = await fetch(
           `${endpoint}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + getCookie("token"),
                },
            }
        );
        const data = await res.json();
        setposttags(data);
        console.log(data);
    };

    const newTag = async (tag) => {
        const res = await fetch("https://photocorner33.onrender.com/tag/newTag", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + getCookie("token"),
            },
            body: JSON.stringify({
                tag: tag
            }),
        });
        await res.json();
        await getTags();
        return true;
    };

    const deleteTag = async (id) => {
        const res = await fetch(
            `
            https://photocorner33.onrender.com/tag/delete/${id}`,
            {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + getCookie("token"),
            },
            }
            );
            const data = await res.json();
            setTags(data.tags.reverse());
            };
            return (
                <TagContext.Provider value={{ getPostTags,posttags,blogTags, getBlogTags, newTag, deleteTag, setSelectedTags }}>
                    {children}
                </TagContext.Provider>
            );

          
        
        };            