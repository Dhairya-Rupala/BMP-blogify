import "./pagi.css";
import { Pagination } from "baseui/pagination";

const Pagi = ({ limit, totalPosts, paginate, page }) => {
  const pages = Math.ceil(totalPosts / limit);

  return (
    <div>
      <Pagination
        numPages={pages}
        currentPage={page}
        onPageChange={({ nextPage }) => {
          paginate(nextPage);
        }}
      />
    </div>
  );
};

export default Pagi;
