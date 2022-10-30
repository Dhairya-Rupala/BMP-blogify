import { useState } from 'react';
import axios from 'axios';

const usePostActions = () => {
    const [posts, setPosts] = useState([]);
    const [singlePost, setSinglePost] = useState({});
    const [currentTab, setCurrentTab] = useState("HOME");

    const onSetPosts = async (search) => {
        const fetchPosts = async () => {
            const fetchedPosts = await axios.get("/posts" + search);
            setPosts(fetchedPosts.data);
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
            currentTab
        },
        onAction,
    })
}

export default usePostActions;