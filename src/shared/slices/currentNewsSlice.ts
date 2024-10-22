import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStatus, Item, TStatus } from "../../utlis/types";
import axios from "axios";
import config from "../../config";
import { RootState } from "../store/store";

const fetchData = async (url: string) => {
  const response = await axios.get<Item>(url);
  return response.data;
};

const handleFetchError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || defaultMessage;
  }
  return defaultMessage;
};

export const fetchComments = createAsyncThunk<Item[], number[]>(
  "currentNews/fetchComments",
  async (arrayID, { rejectWithValue }) => {
    try {
      const commentPromises = arrayID.map((id) =>
        fetchData(`${config.apiUrl}item/${id}.json?print=pretty`)
      );
      return await Promise.all(commentPromises);
    } catch (error) {
      return rejectWithValue(
        handleFetchError(error, "Failed to fetch comments")
      );
    }
  }
);

export const fetchCurrentNews = createAsyncThunk<Item, number>(
  "currentNews/fetchCurrentNews",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchData(`${config.apiUrl}item/${id}.json?print=pretty`);
    } catch (error) {
      return rejectWithValue(handleFetchError(error, "Failed to fetch news"));
    }
  }
);

interface ICurrentNewsState {
  currentNews: Item | null;
  comments: Item[];
  status: TStatus;
  commentsStatus: TStatus;
  error: string | null;
  errorComments: string | null;
}

const initialState: ICurrentNewsState = {
  currentNews: null,
  comments: [],
  status: EStatus.IDLE,
  commentsStatus: EStatus.IDLE,
  error: null,
  errorComments: null,
};

const currentNewsSlice = createSlice({
  name: "currentNews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentNews.pending, (state) => {
        state.status = EStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchCurrentNews.fulfilled, (state, action) => {
        state.status = EStatus.SUCCEEDED;
        state.currentNews = action.payload;
      })
      .addCase(fetchCurrentNews.rejected, (state, action) => {
        state.status = EStatus.FAILED;
        state.error = action.payload as string;
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsStatus = EStatus.LOADING;
        state.errorComments = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsStatus = EStatus.SUCCEEDED;
        const existingIds = new Set(
          state.comments.map((comment) => comment.id)
        );
        const newComments = action.payload.filter(
          (comment) => !existingIds.has(comment.id)
        );
        state.comments = [...state.comments, ...newComments];
      })

      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsStatus = EStatus.FAILED;
        state.errorComments = action.payload as string;
      });
  },
});

export const selectCurrentNews = (state: RootState) =>
  state.currentNews.currentNews;
export const selectNewsStatus = (state: RootState) => state.currentNews.status;
export const selectNewsError = (state: RootState) => state.currentNews.error;
export const selectComments = (state: RootState) => state.currentNews.comments;
export const selectCommentsStatus = (state: RootState) =>
  state.currentNews.commentsStatus;
export const selectCommentsError = (state: RootState) =>
  state.currentNews.errorComments;

export default currentNewsSlice.reducer;
