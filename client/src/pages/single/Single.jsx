import "./single.css";
import SinglePost from "../../components/singlePost/SinglePost";

export default function Single({ cats }) {
  return (
    <div className="single">
      <SinglePost cats={cats} />
    </div>
  );
}
