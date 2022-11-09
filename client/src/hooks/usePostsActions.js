import { useEffect, useState } from 'react';
import axios from 'axios';

const usePostActions = () => {
    const [cats,setCats] = useState([])
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
        fetchCats();
    },[]);


    return ({
        state: {
            cats,
            titleSearch
        },
        setTitleSearch
    })
}

export default usePostActions;