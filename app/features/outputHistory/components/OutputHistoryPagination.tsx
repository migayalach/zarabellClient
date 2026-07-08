"use client";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useOutputHistory, useOutputHistoryActions } from "../hooks";

function OutputHistoryPagination({
  idOutput,
  pages,
}: {
  idOutput: number;
  pages: number;
}) {
  const [current, setCurrent] = useState(1);
  const [index, setIndex] = useState(0);
  const { getAllOutputHistory, resetActionCreateUpdate, clearErrorInfo } =
    useOutputHistoryActions();
  const { info, results, currentOutputHistory, success, error } =
    useOutputHistory();

  const onChange = (page: number) => {
    setCurrent(page);
    getAllOutputHistory(idOutput, page);
  };

  useEffect(() => {
    setIndex(results.length + 1);
  }, [results]);

  useEffect(() => {
    if (currentOutputHistory && success) {
      resetActionCreateUpdate();
      if (index < 21) {
        setCurrent(info!.pages);
        getAllOutputHistory(idOutput, info?.pages);
      } else {
        const tempCount = current + 1;
        setCurrent(tempCount);
        getAllOutputHistory(idOutput, tempCount);
      }
    } else if (success) {
      setTimeout(() => {
        resetActionCreateUpdate();
      }, 1000);
      getAllOutputHistory(idOutput, current);
    }
  }, [currentOutputHistory, success, index]);

  useEffect(() => {
    if (error) {
      clearErrorInfo();
    }
  }, [error]);

  return (
    <Pagination
      onChange={onChange}
      total={pages * 10}
      current={current}
      showSizeChanger={false}
    />
  );
}

export default OutputHistoryPagination;
