"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useCategory } from "../hooks/useCategories";

function CategoryPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { getAllCategories, results } = useCategory();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllCategories(page);
    setCurrent(page);
  };

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
