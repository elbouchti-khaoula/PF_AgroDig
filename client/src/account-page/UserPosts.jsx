import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../contexts/PostContext';
import Post from '../Home/Post';
import styled from 'styled-components';
import { BiGridAlt } from 'react-icons/bi';
import { getCookie } from '../contexts/RequireAuth';
import Layout from '../others/Layout';

const Prof = styled.div`

`
const Main = styled.div`
`
const Me = styled.div`
background-color: var(--ligth-color);
color: var(--black-color);
`
const Avatar = styled.div`
`
function UserPosts() {
    
    const { user } = useAuth();
    const { userPosts, setUserPosts } = usePosts();
    const [loading, setLoading] = useState(true);
  
    const getPosts = useCallback(async () => {
      const res = await fetch(
        "https://photocorner33.onrender.com/post/getPostByPosterID/" + user._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      const posts=[];
      posts = await res.json();
    setUserPosts(posts.posts.reverse());
    setLoading(false);
  }, [user]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (userPosts !== null && userPosts.length === 0) {
    return <p>There are no posts</p>
  }
   else{ 
    return (
        <Layout active="/home/myposts">
				<Main>
                    <div className="w-full flex h-full flex-col mx-auto items-center max-w-[900px]">
                        <div className="flex items-center justify-between mt-3 w-full">
                            <div className="flex items-center">
                                <p className="py-1 border-b-2 border-blue-500">Posts</p>
                            </div>
                            <BiGridAlt className="text-2xl" />
                        </div>
                        <div className="flex flex-col w-full items-center justify-center">
                            {loading &&
                                userPosts === null && (
                                <p className="text-center text-2xl h-[20vh] flex items-center justify-center">
                                    Loading...
                                </p>
                            )}
                            {userPosts !== null &&
                                (userPosts.length === 0 ? (
                                    <p className="text-center text-2xl h-[20vh] flex items-center justify-center">
                                        You have no posts.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {userPosts.map((post) => (
                                            <Post key={post._id} post={post} />
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </div>
                </Main>

			</Layout>
    )
}
} 
export default UserPosts;
