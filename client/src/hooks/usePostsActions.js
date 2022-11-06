import { useEffect, useState } from 'react';
import axios from 'axios';

const usePostActions = () => {
    const [posts, setPosts] = useState([]);
    const [currentTab, setCurrentTab] = useState("HOME");
    const [cats,setCats] = useState([])
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        const fetchCats = async () => {
            const res = await axios.get("/categories");
            res.data.map((cat) => {
                cats.push({
                    id: cat.name,
                    label:cat.name
                })
            })
        }
        fetchCats();
    },[]);

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

    const onDeleteSinglePost = async ({username,id}) => {
        const deletePost = async () => {
            await axios.delete(`/posts/${id}`, {
                data: { username},
            });
        }
        await deletePost();
        setSinglePost({});
    }

    const onUpdateSinglePost = async ({data,id}) => {
        const updatePost = async () => {
            await axios.put(`/posts/${id}`, {
                ...data
            });
        }
        await updatePost();
    }

    const onAction = (action) => {
        switch (action.type) {
            case "SET_POSTS":
                onSetPosts(action.payload);
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
            currentTab,
            cats
        },
        onAction,
        setSearch
    })
}

export default usePostActions;