import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getCookie } from "./RequireAuth";

const TagContext = React.createContext();

export const useTags = () => {
    return useContext(TagContext);
};

export const TagProvider = ({ children }) => {
    const [tags, setTags] = useState([
        {tag: 'javascript', count: 100},
        {tag: 'react', count: 90},
        {tag: 'nodejs', count: 80},
        {tag: 'graphql', count: 70},
        {tag: 'nextjs', count: 60}
    ]);
    const [userTags, setUserTags] = useState(null);
    const { user } = useAuth();

    const getTags = async () => {
        const res = await fetch(
            "https://photocorner33.onrender.com/tag/allTags",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + getCookie("token"),
                },
            }
        );
        const data = await res.json();
        setTags(data.tags.reverse());
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
                <TagContext.Provider value={{ tags, getTags, newTag, deleteTag }}>
                    {children}
                </TagContext.Provider>
            );
        };            