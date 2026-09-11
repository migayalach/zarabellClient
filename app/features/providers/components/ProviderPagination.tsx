"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useProviders } from "../hooks/useProvides";

function ProviderPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const {
    getAllProviders,
    results,
    info,
    watch,
    error,
    clearErrorProvider,
    clearInfoWatchProvider,
  } = useProviders();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllProviders(page);
    setCurrent(page);
  };

  useEffect(() => {
    if (!watch) return;

    switch (watch) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllProviders(page);
        break;
      }

      case "update": {
        getAllProviders(current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllProviders(previousPage);
        } else {
          getAllProviders(current);
        }
        break;
      }
    }
    clearInfoWatchProvider();
  }, [watch]);

  useEffect(() => {
    if (error) {
      clearErrorProvider();
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

export default ProviderPagination;
