// libs 
import { useState } from "react";
import debounce from 'lodash.debounce'
import { Input } from 'baseui/input'
import { Search } from 'baseui/icon';
import "./DebouncedInput.css"

const DEBOUNCE_DELAY = 550;
const OVERRIDES = {
  EndEnhancer: {
    style: {
      padding: 0,
    },
  },
};

const DebouncedInput = ({setTitleSearch}) => {
    const [debSearch, setDebSearch] = useState('')
    const debouncedChange = debounce(setTitleSearch, DEBOUNCE_DELAY)

    const handleSearchChange = (e) => {
        setDebSearch(e.target.value)
        debouncedChange(e.target.value)
    }

    return (
        <div className="debouncedContainer">
            <Input
      endEnhancer={<Search size={22} />}
      overrides={OVERRIDES}
      value={debSearch}
      clearable
      onChange={(e)=>handleSearchChange(e)}
      placeholder="Search Posts"
    />
        </div>
        
    )
}

export default DebouncedInput;