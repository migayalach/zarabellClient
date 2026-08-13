"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useBranchs, useBranchsActions } from "@/app/features/branchs/hooks";

function BranchPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { info, results, error, actionBranch } = useBranchs();
  const { getAllBranchs, clearErrorBranch, resetBranchActionState } =
    useBranchsActions();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllBranchs(page);
    setCurrent(page);
  };

  useEffect(() => {
    if (!actionBranch) return;

    switch (actionBranch) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllBranchs(page);
        break;
      }

      case "update": {
        getAllBranchs(current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllBranchs(previousPage);
        } else {
          getAllBranchs(current);
        }
        break;
      }
    }
    resetBranchActionState();
  }, [actionBranch]);

  useEffect(() => {
    if (error) {
      clearErrorBranch();
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

export default BranchPagination;
