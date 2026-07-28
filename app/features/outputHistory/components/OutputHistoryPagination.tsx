"use client";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useOutputHistory, useOutputHistoryActions } from "../hooks";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";

function OutputHistoryPagination({
  idOutput,
  pages,
}: {
  idOutput: number;
  pages: number;
}) {
  const [current, setCurrent] = useState(1);
  const { getAllOutputHistory, resetActionCreateUpdate, clearErrorInfo } =
    useOutputHistoryActions();
  const { info, results, error, action } = useOutputHistory();

  const onChange = (page: number) => {
    setCurrent(page);
    getAllOutputHistory(idOutput, page);
  };

  useEffect(() => {
    if (!action) return;

    switch (action) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllOutputHistory(idOutput, page);
        break;
      }

      case "update": {
        getAllOutputHistory(idOutput, current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllOutputHistory(idOutput, previousPage);
        } else {
          getAllOutputHistory(idOutput, current);
        }
        break;
      }
    }
    resetActionCreateUpdate();
  }, [action]);

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
