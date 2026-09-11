"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useTOutputs } from "../hooks/useTypeOutputs";

function OutputTypePagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const {
    getAllTOutputs,
    results,
    action,
    info,
    clearErrorTOutput,
    resetActionDataTOutput,
    error,
  } = useTOutputs();
  const onChange: PaginationProps["onChange"] = (page) => {
    getAllTOutputs(page);
    setCurrent(page);
  };

  useEffect(() => {
    if (!action) return;

    switch (action) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllTOutputs(page);
        break;
      }

      case "update": {
        getAllTOutputs(current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllTOutputs(previousPage);
        } else {
          getAllTOutputs(current);
        }
        break;
      }
    }
    resetActionDataTOutput();
  }, [action]);

  useEffect(() => {
    if (error) {
      clearErrorTOutput();
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

export default OutputTypePagination;
