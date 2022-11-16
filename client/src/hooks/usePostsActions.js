import { useEffect, useState } from 'react';
import axios from 'axios';

const usePostActions = () => {
    const [cats, setCats] = useState([])
    const [allTags,setAllTags] = useState([])
    const [titleSearch, setTitleSearch] = useState('');
    
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


    return ({
        state: {
            cats,
            allTags,
            titleSearch
        },
        setTitleSearch
    })
}

export default usePostActions;