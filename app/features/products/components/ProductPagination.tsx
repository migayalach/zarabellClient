"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useProducts } from "../hooks/useProducts";

function ProductPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const {
    getAllProducts,
    results,
    info,
    error,
    clearInfoWatchProduct,
    watch,
    clearErrorProduct,
  } = useProducts();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllProducts(page);
    setCurrent(page);
  };

  useEffect(() => {
    if (!watch) return;

    switch (watch) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllProducts(page);
        break;
      }

      case "update": {
        getAllProducts(current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllProducts(previousPage);
        } else {
          getAllProducts(current);
        }
        break;
      }
    }
    clearInfoWatchProduct();
  }, [watch]);

  useEffect(() => {
    if (error) {
      clearErrorProduct();
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

export default ProductPagination;
