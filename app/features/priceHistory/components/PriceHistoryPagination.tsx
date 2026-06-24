"use client";
import { useState } from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

function PriceHistoryPagination() {
  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return <Pagination current={current} onChange={onChange} total={50} />;
}

export default PriceHistoryPagination;
