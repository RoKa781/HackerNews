import { useState } from "react";
import st from "./Comment.module.css";
import { Item } from "../../utlis/types";
import CommentList from "../CommentList/CommentList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../shared/store/store";
import { fetchComments } from "../../shared/slices/currentNewsSlice";

interface CommentProps {
  data: Item;
}

const Comment: React.FC<CommentProps> = ({ data }) => {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const { by, text, time, kids } = data;


  const toggleReplies = () => {
    setAreRepliesVisible(!areRepliesVisible);
    if (kids) {
      dispatch(fetchComments(kids))
    }
  };


  return (
    <div className={st.comment}>
      <div className={st.titleComment}>
        <span className={st.author}>{by}</span>
        <span className={st.date}>
          {time ? new Date(time * 1000).toLocaleString() : "unknown"}
        </span>
      </div>
      <p className={st.text}>
        {text}
      </p>

      {kids && kids.length > 0 && (
        <button className={st.showRepliesButton} onClick={toggleReplies}>
          {areRepliesVisible ? "Close answers" : `Open answers (${kids.length})`}
        </button>
      )}

      {areRepliesVisible && kids && (
        <div className={st.childComments}>
          <CommentList commentsList={kids} />
        </div>
      )}
    </div>
  );
};

export default Comment;
