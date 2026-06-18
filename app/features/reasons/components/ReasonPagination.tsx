"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useReasons } from "../hooks/useReason";

function ReasonPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { getAllReasons, results } = useReasons();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllReasons(page);
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

export default ReasonPagination;
