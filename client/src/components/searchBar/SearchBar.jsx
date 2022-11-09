import DebouncedInput from '../debouncedInput/DebouncedInput';
import './searchbar.css';

const SearchBar = ({setTitleSearch}) => {
    return (
        <div className="searchBarContainer">
            <DebouncedInput setTitleSearch={setTitleSearch}/>
        </div>
    )
}

export default SearchBar;