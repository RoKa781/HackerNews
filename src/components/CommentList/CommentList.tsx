import { IoReload } from "react-icons/io5";
import st from "./CommentList.module.css";
import Comment from "../Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../shared/store/store";
import Preload from "../Preload/Preload";
import Error from "../Error/Error";
import {
  fetchComments,
  selectComments,
  selectCommentsStatus,
  selectCommentsError,
} from "../../shared/slices/currentNewsSlice";
import { useEffect } from "react";

interface CommentsListProps {
  commentsList: number[];
}

const CommentList: React.FC<CommentsListProps> = ({ commentsList }) => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(selectComments);
  const status = useSelector(selectCommentsStatus);
  const error = useSelector(selectCommentsError);

  useEffect(() => {
    if (commentsList.length > 0) {
      dispatch(fetchComments(commentsList));
    }
  }, [commentsList, dispatch]);

  const fetch = () => {
    if (commentsList.length > 0) {
      dispatch(fetchComments(commentsList));
    }
  };

  const filteredComments = comments.filter(comment => commentsList.includes(comment.id));

  return (
    <div className={st.list}>
      <button className={st.button} onClick={fetch}>
        <IoReload size={25} className={st.reload} />
      </button>
      {status === "loading" && <Preload />}
      {error && <Error error={error} />}
      {filteredComments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default CommentList;

