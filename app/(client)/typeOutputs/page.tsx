"use client";
import { useEffect } from "react";
import { useTOutputs } from "@/app/features/typeOutputs/hooks/useTypeOutputs";
import {
  OutputTypeButtonModal,
  OutputTypePagination,
  OutputTypeTable,
} from "@/app/features/typeOutputs/components";
import Loading from "@/app/shared/components/Loading";

function Page() {
  const { info, results, getAllTOutputs, resetDataTOutput, loading } =
    useTOutputs();

  useEffect(() => {
    getAllTOutputs();

    return () => {
      resetDataTOutput();
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista tipos de salida</h1>
        <OutputTypeButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1 mt-2">
        <OutputTypeTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <OutputTypePagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
