"use client";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SIZE_PAGINATION } from "@/app/helpers/constans.helpers";
import { useInputRecord, useInputRecordActions } from "../hooks";

function InputRecordPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { info, results, error, actionInputRecord } = useInputRecord();
  const {
    getAllInputRecords,
    clearErrorInputRecord,
    resetInputRecordActionState,
  } = useInputRecordActions();

  const onChange: PaginationProps["onChange"] = (page) => {
    getAllInputRecords(page);
    setCurrent(page);
  };

  useEffect(() => {
    if (!actionInputRecord) return;

    switch (actionInputRecord) {
      case "create": {
        const page =
          (info!.count + 1) % SIZE_PAGINATION === 1 ? pages + 1 : pages;
        setCurrent(page);
        getAllInputRecords(page);
        break;
      }

      case "update": {
        getAllInputRecords(current);
        break;
      }

      case "delete": {
        if (results.length === 1 && current > 1) {
          const previousPage = current - 1;
          setCurrent(previousPage);
          getAllInputRecords(previousPage);
        } else {
          getAllInputRecords(current);
        }
        break;
      }
    }
    resetInputRecordActionState();
  }, [actionInputRecord]);

  useEffect(() => {
    if (error) {
      clearErrorInputRecord();
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

export default InputRecordPagination;
