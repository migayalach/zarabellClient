"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useProducts } from "../hooks/useProducts";

function ProductPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { getAllProducts, results } = useProducts();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllProducts(page);
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

export default ProductPagination;
