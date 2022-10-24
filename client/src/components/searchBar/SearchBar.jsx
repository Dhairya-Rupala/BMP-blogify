import { useState } from 'react';
import './searchbar.css';
import axios from 'axios';

const SearchBar = ({setPosts}) => {
    const [searchQuerry, setSearchQuerry] = useState("");

    const triggerSearch = async () => {
        const posts = await axios.get("/search", {
            params: {
                searchTitle:searchQuerry
            }
        })
        console.log(posts)
        setPosts([]);
    }
    return (
        <div className="searchBarContainer">
            <input onChange={e => setSearchQuerry(e.target.value)} />
            <button className="searchButton" onClick={triggerSearch}>Search</button>
        </div>
    )
}

export default SearchBar;