"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useUsers } from "../hooks/useUsers";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";

function UserPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const {
    getAllUsers,
    results,
    clearInfoWatchAction,
    watch,
    info,
    error,
    clearDataCurrentUser,
  } = useUsers();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllUsers(page);
    setCurrent(page);
  };

  useEffect(() => {
    if (!watch) return;

    switch (watch) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllUsers(page);
        break;
      }

      case "update": {
        getAllUsers(current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllUsers(previousPage);
        } else {
          getAllUsers(current);
        }
        break;
      }
    }
    clearInfoWatchAction();
  }, [watch]);

  useEffect(() => {
    if (error) {
      clearDataCurrentUser();
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

export default UserPagination;
