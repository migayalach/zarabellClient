"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useReasons } from "../hooks/useReason";

function ReasonPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const {
    getAllReasons,
    results,
    error,
    info,
    action,
    clearErrorReason,
    resetActionDataReason,
  } = useReasons();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllReasons(page);
    setCurrent(page);
  };

  useEffect(() => {
    if (!action) return;

    switch (action) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllReasons(page);
        break;
      }

      case "update": {
        getAllReasons(current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllReasons(previousPage);
        } else {
          getAllReasons(current);
        }
        break;
      }
    }
    resetActionDataReason();
  }, [action]);

  useEffect(() => {
    if (error) {
      clearErrorReason();
    }
  }, [error]);

  return (
    <Pagination
      onChange={onChange}
      total={(pages || 0) * 10}
      current={current}
      showSizeChanger={false}
    />
  );
}

export default ReasonPagination;
