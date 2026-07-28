"use client";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { usePriceHistory, usePriceHistoryActions } from "../hooks";

function PriceHistoryPagination({
  idInputRecord,
  pages,
}: {
  idInputRecord: number;
  pages: number;
}) {
  const [current, setCurrent] = useState(1);
  const [index, setIndex] = useState(0);
  const { getAllPriceHistory, resetActionCreateUpdate, clearErrorInfo } =
    usePriceHistoryActions();
  const { info, results, currentPriceHistory, success, error } =
    usePriceHistory();

  const onChange = (page: number) => {
    setCurrent(page);
    getAllPriceHistory(idInputRecord, page);
  };

  useEffect(() => {
    setIndex(results.length + 1);
  }, [results]);

  useEffect(() => {
    if (currentPriceHistory && success) {
      resetActionCreateUpdate();
      if (index < 21) {
        setCurrent(info!.pages);
        getAllPriceHistory(idInputRecord, info?.pages);
      } else {
        const tempCount = current + 1;
        setCurrent(tempCount);
        getAllPriceHistory(idInputRecord, tempCount);
      }
    } else if (success) {
      setTimeout(() => {
        resetActionCreateUpdate();
      }, 1000);
      getAllPriceHistory(idInputRecord, current);
    }
  }, [currentPriceHistory, success, index]);

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

export default PriceHistoryPagination;
