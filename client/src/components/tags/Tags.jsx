import "./Tags.css"
import { Select } from "baseui/select";
const Tags = ({allTags,tags}) => {
    return (
        <Select
        options={allTags}
        value={tags}
        multi
        placeholder="Select tags"
        onChange={({value}) => setTags(value)}
    />
    )
}

export default Tags;