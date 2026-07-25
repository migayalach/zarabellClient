"use client";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useOutput, useOutputActions } from "../hooks";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";

function OutputPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { getAllOutputs, clearErrorOutput, resetActionState } =
    useOutputActions();
  const { info, error, results, actionOutput } = useOutput();

  const onChange = (page: number) => {
    setCurrent(page);
    getAllOutputs(page);
  };

  useEffect(() => {
    if (!actionOutput) return;

    switch (actionOutput) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllOutputs(page);
        break;
      }

      case "update": {
        getAllOutputs(current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllOutputs(previousPage);
        } else {
          getAllOutputs(current);
        }
        break;
      }
    }
    resetActionState();
  }, [actionOutput]);

  useEffect(() => {
    if (error) {
      clearErrorOutput();
    }
  }, [error]);

  return (
    <Pagination
      onChange={onChange}
      total={pages * 10}
      current={current}
      showSizeChanger={false}
    />
  );
}

export default OutputPagination;
