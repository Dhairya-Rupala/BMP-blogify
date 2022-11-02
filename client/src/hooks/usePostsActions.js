import { useEffect, useState } from 'react';
import axios from 'axios';

const usePostActions = () => {
    const [posts, setPosts] = useState([]);
    const [singlePost, setSinglePost] = useState({});
    const [currentTab, setCurrentTab] = useState("HOME");
    const [search, setSearch] = useState('');

    // need to be optimized and the case of category and the username 
    useEffect(() => {
        const fetchFilteredPosts = async () => {
            let filteredPosts = await axios.get("/search", {
                params: {
                    searchTitle: search
                }
            });
            filteredPosts = filteredPosts.data;
            const currentRoute = window.location.href;
            if(!currentRoute.includes("cat") && !currentRoute.includes("user"))
                setPosts(filteredPosts)
            else {
                let populatedPosts = [];
                for (let post of posts) {
                    for (let filtered_post of filteredPosts) {
                        if (post._id == filtered_post._id) {
                            populatedPosts.push(post)
                        }
                    }
                }
                setPosts(populatedPosts)
            }
        }
        fetchFilteredPosts();
    },[search])

    const onSetPosts = async (search) => {
        const fetchPosts = async () => {
            let fetchedPosts = await axios.get("/posts" + search);
            fetchedPosts = fetchedPosts.data;
            if (posts.length != 0) {
                let populatedPosts = [];
                for (let post of posts) {
                    for (let fetched_post of fetchedPosts) {
                        if (post._id == fetched_post._id) {
                            populatedPosts.push(post)
                        }
                    }
                }
                setPosts(populatedPosts)
            }
            else
                setPosts(fetchedPosts);
        }
        await fetchPosts();
    }

    const onSetSinglePost = async (search) => {
        const fetchPost = async () => {
            const fetchedPost = await axios.get("/posts/" + search);
            setSinglePost(fetchedPost.data);
        }
        await fetchPost();
    }

    const onDeleteSinglePost = async (username) => {
        const deletePost = async () => {
            await axios.delete(`/posts/${singlePost._id}`, {
                data: { username},
            });
        }
        await deletePost();
        setSinglePost({});
    }

    const onUpdateSinglePost = async (updatedPostData) => {
        const updatePost = async () => {
            await axios.put(`/posts/${post._id}`, {
                ...updatedPostData
            });
        }
        await updatePost();
        setSinglePost({
            ...singlePost,
            ...updatedPostData
        })
    }

    const onAction = (action) => {
        switch (action.type) {
            case "SET_POSTS":
                onSetPosts(action.payload);
                break;
            case "SET_SINGLE_POST":
                onSetSinglePost(action.payload);
                break;
            case "DELETE_SINGLE_POST":
                onDeleteSinglePost(action.payload);
                break;
            case "UPDATE_SINGLE_POST":
                onUpdateSinglePost(action.payload);
                break;
            case "UPDATE_TAB":
                setCurrentTab(action.payload)
                break
            default:
                break
            
        }
    }

    return ({
        state: {
            posts,
            singlePost,
            currentTab,
        },
        onAction,
        setSearch
    })
}

export default usePostActions;