import "./single.css";
import SinglePost from "../../components/singlePost/SinglePost";

export default function Single({ cats,allTags,onNotifAction }) {
  return (
    <div className="single">
      <SinglePost cats={cats} allTags={allTags} onNotifAction={onNotifAction} />
    </div>
  );
}
