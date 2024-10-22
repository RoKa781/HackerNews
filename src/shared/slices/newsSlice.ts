import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";
import { EStatus, Item, TStatus } from "../../utlis/types";
import { RootState } from "../store/store";

export const fetchNews = createAsyncThunk<
  Item[],
  [string | null, number, AbortSignal]
>("news/fetchNews", async ([stories, page, signal]) => {
  const response = await axios.get<number[]>(
    `${config.apiUrl}${stories}.json?print=pretty`,
    { signal }
  );
  const idArray = response.data.slice((page - 1) * 20, page * 20);

  const newsPromises = idArray.map((id) =>
    axios.get<Item>(`${config.apiUrl}item/${id}.json?print=pretty`, { signal })
  );

  const newsResponses = await Promise.all(newsPromises);
  return newsResponses.map((res) => res.data);
});

export const fetchIntervalNews = createAsyncThunk<Item[], string | null>(
  "news/fetchIntervalNews",
  async (stories) => {
    const response = await axios.get<number[]>(
      `${config.apiUrl}${stories}.json?print=pretty`
    );
    const idArray = response.data.slice(0, 5);

    const newsPromises = idArray.map((id) =>
      axios.get<Item>(`${config.apiUrl}item/${id}.json?print=pretty`)
    );

    const newsResponses = await Promise.all(newsPromises);
    return newsResponses.map((res) => res.data);
  }
);

interface NewsState {
  newsIds: Item[];
  status: TStatus;
  error: string | null;
}

const initialState: NewsState = {
  newsIds: [],
  status: EStatus.IDLE,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetNews(state) {
      state.newsIds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = EStatus.LOADING;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = EStatus.SUCCEEDED;
        const existingIds = new Set(state.newsIds.map((news) => news.id));
        const newNews = action.payload.filter(
          (newsItem) => !existingIds.has(newsItem.id)
        );
        state.newsIds = [...state.newsIds, ...newNews];
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = EStatus.FAILED;
        state.error = action.error.message || "Failed to fetch news";
      })
      .addCase(fetchIntervalNews.fulfilled, (state, action) => {
        const existingIds = new Set(state.newsIds.map((news) => news.id));
        const newNews = action.payload.filter(
          (newsItem) => !existingIds.has(newsItem.id)
        );
        state.newsIds = [...newNews, ...state.newsIds];
      });
  },
});

export const selectNews = (state: RootState) => state.news.newsIds;
export const selectNewsStatus = (state: RootState) => state.news.status;
export const selectNewsError = (state: RootState) => state.news.error;
export const { resetNews } = newsSlice.actions;
export default newsSlice.reducer;
