import { nanoid } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoReload } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchIntervalNews,
  fetchNews,
  resetNews,
  selectNews,
  selectNewsError,
  selectNewsStatus,
} from "../../shared/slices/newsSlice";
import { AppDispatch } from "../../shared/store/store";
import { urlTabHandler, urlTabHandlerName } from "../../utlis/helpers";
import Error from "../Error/Error";
import News from "../News/News";
import Preload from "../Preload/Preload";
import Tabs from "../TabsHome/TabsHome";
import st from "./NewsList.module.css";

const dataTabs = ["New", "Top", "Best"];

const NewsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const news = useSelector(selectNews);
  const status = useSelector(selectNewsStatus);
  const error = useSelector(selectNewsError);
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const abortControllerRef = useRef<AbortController | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const fetchCurrentNews = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const signal = abortController.signal;

    try {
      await dispatch(
        fetchNews([searchParams.get("tab") || "newstories", page, signal])
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch error:", error);
      } else {
        console.error("Fetch error:", error);
      }
    }
  }, [dispatch, searchParams, page]);

  const changeTab = (index: number) => {
    setCurrentTab(index);
    setSearchParams({ tab: urlTabHandler(index) });
    dispatch(resetNews());
    setPage(1);
  };

  const reloadHandler = () => {
    dispatch(resetNews());
    fetchCurrentNews();
  };

  useEffect(() => {
    if (searchParams) {
      setCurrentTab(urlTabHandlerName(searchParams.get("tab") || "newstories"));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchCurrentNews();

    const intervalId = setInterval(() => {
      dispatch(fetchIntervalNews(searchParams.get("tab") || "newstories"));
    }, 60000);

    return () => {
      clearInterval(intervalId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [dispatch, fetchCurrentNews, searchParams]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && status === "succeeded") {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (bottomRef.current) observerRef.current.observe(bottomRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [status]);

  return (
    <>
      <Tabs
        tabsData={dataTabs}
        currentTab={currentTab}
        setCurrentTab={changeTab}
      />
      <div className={st.newsList}>
        <button className={st.button} onClick={reloadHandler}>
          <IoReload size={25} className={st.reload} />
        </button>
        {(status === "loading" || error === "canceled") && <Preload />}
        {error && error !== "canceled" && <Error error={error} />}
        {news.map((item) => (
          <News key={item.id || nanoid()} data={item} />
        ))}
        <div ref={bottomRef} style={{ height: "1px", position: 'relative' }} />
      </div>
    </>
  );
};

export default NewsList;
