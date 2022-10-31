import DebouncedInput from '../debouncedInput/DebouncedInput';
import './searchbar.css';

const SearchBar = ({setSearch}) => {
    return (
        <div className="searchBarContainer">
            <DebouncedInput setSearch={setSearch}/>
        </div>
    )
}

export default SearchBar;