import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../../components/CommentList/CommentList";
import st from "./NewsPage.module.css";
import {
  fetchCurrentNews,
  selectCurrentNews,
  selectNewsStatus,
  selectNewsError,
} from "../../shared/slices/currentNewsSlice";
import { AppDispatch } from "../../shared/store/store";
import Error from "../../components/Error/Error";
import Preload from "../../components/Preload/Preload";

const NewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const data = useSelector(selectCurrentNews);
  const status = useSelector(selectNewsStatus);
  const error = useSelector(selectNewsError);

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentNews(Number(id)));
    }
  }, [id, dispatch]);

  return (
    <div className={st.currentNews}>
      <button className={st.link} onClick={() => navigate(-1)}>
        Back to news
      </button>
      {status === "loading" && <Preload />}
      {error && (
        <div className={st.errorContainer}>
          <Error error={error} />
        </div>
      )}
      {status === "succeeded" && data && (
        <>
          <div className={st.titleContainer}>
            <h2 className={st.currentNewsTitle}>{data.title}</h2>
            <p className={st.date}>
              {data.time
                ? new Date(data.time * 1000).toLocaleString()
                : "unknown"}
            </p>
          </div>
          <div className={st.titleContainer}>
            <a
              className={st.link}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read here
            </a>
            <p className={st.author}>by: {data.by}</p>
          </div>
          <p className={st.commentCount}>
            Comments: {data.kids ? data.kids.length : "Not found comments"}
          </p>
          <CommentList commentsList={data.kids || []} />
        </>
      )}
    </div>
  );
};

export default NewsPage;
