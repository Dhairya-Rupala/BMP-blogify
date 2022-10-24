import "./header.css";

export default function Header() {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Place to tell your stories</span>
        <span className="headerTitleLg">Blogify</span>
      </div>
      <img
        className="headerImg"
        src={PF + "/dacover.jpg"}
        alt=""
      />
    </div>
  );
}
