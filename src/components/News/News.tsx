import { Link } from "react-router-dom";
import { Item } from "../../utlis/types";
import st from "./News.module.css";

interface NewsProps {
  data: Item;
}

const News: React.FC<NewsProps> = ({ data }) => {
  const { title, score, by, time, id } = data;

  return (
    
    <div className={st.news}>
      <Link to={`/news/${id}`}>
      <div className={st.newsTitle}>
        <h2 className={st.title}>{title}</h2>
        <p className={st.date}>
          {time ? new Date(time * 1000).toLocaleString() : "unknown"}
        </p>
      </div>
      <p className={st.rating}>Rating: {score}</p>
      <p className={st.author}>Author: {by}</p>
    </Link>
    </div>
  );
};

export default News;
