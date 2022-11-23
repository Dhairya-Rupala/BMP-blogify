import { useEffect, useState } from 'react';
import axios from 'axios';

const usePostActions = () => {
    const [cats, setCats] = useState([])
    const [allTags,setAllTags] = useState([])
    const [titleSearch, setTitleSearch] = useState('');
    const [notifs,setNotifs] = useState([])
    
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
    },[]);

    const createNotify = async ({msg,user}) => {
        try {
            console.log(user)
            console.log(msg)
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
    const onNotifAction = (notifAction) => {
        switch (notifAction.type) {
            case "CREATE_NOTIFY":
                createNotify(notifAction.payload)
                break
        }
    }

    return ({
        state: {
            cats,
            allTags,
            titleSearch
        },
        setTitleSearch,
        onNotifAction
    })
}

export default usePostActions;