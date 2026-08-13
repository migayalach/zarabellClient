"use client";
import { useTOutputs } from "@/app/features/typeOutputs/hooks/useTypeOutputs";
import {
  OutputTypeButtonModal,
  OutputTypePagination,
  OutputTypeTable,
} from "@/app/features/typeOutputs/components";
import Loading from "@/app/shared/components/Loading";
import { useInitialLoading } from "@/app/features/auth/hooks/useInitialLoading";

function Page() {
  const { info, results, getAllTOutputs, resetDataTOutput } = useTOutputs();
  const initialLoading = useInitialLoading(getAllTOutputs, resetDataTOutput);

  if (initialLoading) return <Loading />;

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
