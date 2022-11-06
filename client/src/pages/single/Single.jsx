import "./single.css";
import SinglePost from "../../components/singlePost/SinglePost";

export default function Single({ cats,onAction }) {
  return (
    <div className="single">
      <SinglePost cats={cats} onAction={onAction} />
    </div>
  );
}
