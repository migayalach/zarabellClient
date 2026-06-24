"use client";
import { useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { usePagInputRecords } from "../hooks/useInputRecordPagination";

function InputRecordPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { pagRecordInput } = usePagInputRecords();

  const onChange: PaginationProps["onChange"] = (page) => {
    pagRecordInput(page);
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

export default InputRecordPagination;
