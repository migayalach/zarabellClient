"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useCategory } from "../hooks/useCategories";

function CategoryPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const {
    getAllCategories,
    results,
    info,
    error,
    clearErrorCategory,
    action,
    resetActionDataCategory,
  } = useCategory();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllCategories(page);
    setCurrent(page);
  };

  useEffect(() => {
    if (!action) return;

    switch (action) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllCategories(page);
        break;
      }

      case "update": {
        getAllCategories(current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllCategories(previousPage);
        } else {
          getAllCategories(current);
        }
        break;
      }
    }
    resetActionDataCategory();
  }, [action]);

  useEffect(() => {
    if (error) {
      clearErrorCategory();
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

export default CategoryPagination;
