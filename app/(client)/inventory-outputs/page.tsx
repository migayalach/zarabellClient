"use client";
import { useEffect } from "react";
import {
  OutputButtonModal,
  OutputPagination,
  OutputTable,
} from "@/app/features/outputsInventory/components";
import {
  useOutput,
  useOutputActions,
} from "@/app/features/outputsInventory/hooks";
import Loading from "@/app/shared/components/Loading";

function Page() {
  const { getAllOutputs, resetOutput } = useOutputActions();
  const { info, results, loading } = useOutput();

  useEffect(() => {
    getAllOutputs();

    return () => {
      resetOutput();
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de salidas</h1>
        <OutputButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1 mt-2">
        <OutputTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <OutputPagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
