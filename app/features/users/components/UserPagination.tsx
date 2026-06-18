"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useUsers } from "../hooks/useUsers";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";

function UserPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { getAllUsers, results, clearInfoWatchAction, watch } = useUsers();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllUsers(page);
    setCurrent(page);
  };

  useEffect(() => {
    if (!watch) return;

    if (watch === "create" && results.length) {
      const index = results.length + 1;
      if (index <= SIZE_PAGINATION) {
        getAllUsers(current);
      } else {
        const nextPage = current + 1;
        setCurrent(nextPage);
        getAllUsers(nextPage);
      }
    } else if (watch === "delete") {
    } else if (watch === "update") {
    }

    setTimeout(() => {
      clearInfoWatchAction();
    }, 1000);
  }, [watch]);

  return (
    <Pagination
      onChange={onChange}
      total={(pages || 0) * 10}
      current={current}
      showSizeChanger={false}
    />
  );
}

export default UserPagination;
