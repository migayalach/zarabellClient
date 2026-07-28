"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useRoles } from "../hooks/useRoles";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";

function RolePagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { getAllRoles, results } = useRoles();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllRoles(page);
    setCurrent(page);
  };

  // useEffect(() => {
  //   if (!watch) return;

  //   if (watch === "create" && results.length) {
  //     const index = results.length + 1;
  //     if (index <= SIZE_PAGINATION) {
  //       getAllUsers(current);
  //     } else {
  //       const nextPage = current + 1;
  //       setCurrent(nextPage);
  //       getAllUsers(nextPage);
  //     }
  //   } else if (watch === "delete") {
  //   } else if (watch === "update") {
  //   }

  //   setTimeout(() => {
  //     clearInfoWatchAction();
  //   }, 1000);
  // }, [watch]);

  return (
    <Pagination
      onChange={onChange}
      total={(pages || 0) * 10}
      current={current}
      showSizeChanger={false}
    />
  );
}

export default RolePagination;
