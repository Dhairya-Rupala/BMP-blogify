import { useEffect, useState } from 'react';
import axios from 'axios';

const usePostActions = (user) => {
    const [cats, setCats] = useState([])
    const [allTags,setAllTags] = useState([])
    const [titleSearch, setTitleSearch] = useState('');
    const [notifs, setNotifs] = useState([])
    
    const fetchNotifications = async (userId) => {
        try {
            const res = await axios.get(`/notify/${userId??''}`)
            setNotifs(res.data)
            return ""
        }
        catch (err) {
            return "Something went wrong"
        }
    }
    
    useEffect(() => {
        const fetchCats = async () => {
            const res = await axios.get("/categories");
            let fetchedCats = []
            res.data.map((cat) => {
                fetchedCats.push({
                    id: cat.name,
                    label:cat.name
                })
            })
            setCats([...fetchedCats])
        }

        const fetchTags = async () => {
            const res = await axios.get("/tags");
            let fetchedTags = []
            res?.data[0]?.tags.map((tag) => {
                fetchedTags.push({
                    id: tag,
                    label:tag
                })
            })
            setAllTags([...fetchedTags])

        }
        fetchCats();
        fetchTags();
    }, []);
    
    useEffect(() => {
        fetchNotifications(user?._id);
    },[user])

    const createNotify = async ({ msg, user }) => {
        console.log(user,msg)
        try {
            const res = await axios.post("/notify",{
                data: {
                    user,msg
                },
            })
            return "Notification added"
        }
        catch (err) {
            return "Something Went wrong";
        }
    }

    const deleteNotify = async (notifId) => {
        try {
            const res = await axios.delete(`/notify/${notifId}/${user._id}`)
            setNotifs(notifs.filter((notif) => notif._id != notifId))
            console.log(notifs)

        }   
        catch (err) {
            return "Something Went wrong";
        }
    }

    const onNotifAction = (notifAction) => {
        switch (notifAction.type) {
            case "CREATE_NOTIFY":
                createNotify(notifAction.payload)
                break
            
            case "DELETE_NOTIFY":
                deleteNotify(notifAction.payload)
                break
        }
    }

    return ({
        state: {
            cats,
            allTags,
            titleSearch,
            notifs
        },
        setTitleSearch,
        onNotifAction
    })
}

export default usePostActions;