"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useRoles } from "../hooks/useRoles";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";

function RolePagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const {
    getAllRoles,
    results,
    info,
    actionRole,
    error,
    clearErrorRole,
    resetActionDataRole,
  } = useRoles();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllRoles(page);
    setCurrent(page);
  };

  useEffect(() => {
    if (!actionRole) return;

    switch (actionRole) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllRoles(page);
        break;
      }

      case "update": {
        getAllRoles(current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllRoles(previousPage);
        } else {
          getAllRoles(current);
        }
        break;
      }
    }
    resetActionDataRole();
  }, [actionRole]);

  useEffect(() => {
    if (error) {
      clearErrorRole();
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

export default RolePagination;
