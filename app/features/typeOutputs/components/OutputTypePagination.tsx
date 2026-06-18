"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useTOutputs } from "../hooks/useTypeOutputs";

function OutputTypePagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { getAllTOutputs, results } = useTOutputs();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllTOutputs(page);
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

export default OutputTypePagination