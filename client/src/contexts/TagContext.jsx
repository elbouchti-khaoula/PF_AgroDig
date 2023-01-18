import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getCookie } from "./RequireAuth";
import configData from '../Config.json';

const TagContext = React.createContext();

export const useTags = () => {
    return useContext(TagContext);
};

export const TagProvider = ({ children }) => {
    const [blogTags, setBlogTags] = useState([
        {id : 1,name: 'javascript', usageCount: 100},
        {id : 2,name: 'react', usageCount: 90},
        {id : 3,name: 'nodejs', usageCount: 80},
        {id : 4,name: 'graphql', usageCount: 70},
        {id : 5,name: 'nextjs', usageCount: 60}
    ]);
    const [selectedTags, setSelectedTags] = useState([]);
   // const [userTags, setUserTags] = useState(null);
   //  const { user } = useAuth();

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
                <TagContext.Provider value={{ blogTags, getBlogTags, newTag, deleteTag, setSelectedTags }}>
                    {children}
                </TagContext.Provider>
            );

          
        
        };            