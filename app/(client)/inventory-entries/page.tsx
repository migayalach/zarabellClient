"use client";
import {
  InputRecordButtonModal,
  InputRecodTable,
  InputRecordPagination,
} from "@/app/features/inputRecord/components";
import { usePagInputRecords } from "@/app/features/inputRecord/hooks/useInputRecordPagination";
import { useEffect } from "react";

function Page() {
  const { info, results, pagRecordInput } = usePagInputRecords();

  useEffect(() => {
    pagRecordInput();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de entradas</h1>
        <InputRecordButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1 mt-2">
        <InputRecodTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <InputRecordPagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
