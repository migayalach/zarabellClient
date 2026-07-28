"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useProviders } from "../hooks/useProvides";

function ProviderPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { getAllProviders, results } = useProviders();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllProviders(page);
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

export default ProviderPagination;
