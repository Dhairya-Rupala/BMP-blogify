import "./single.css";
import SinglePost from "../../components/singlePost/SinglePost";

export default function Single({ cats,allTags }) {
  return (
    <div className="single">
      <SinglePost cats={cats} allTags={allTags} />
    </div>
  );
}
