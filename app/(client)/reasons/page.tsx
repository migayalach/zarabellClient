"use client";
import { useInitialLoading } from "@/app/features/auth/hooks/useInitialLoading";
import {
  ReasonButtonModal,
  ReasonPagination,
  ReasonTable,
} from "@/app/features/reasons/components";
import { useReasons } from "@/app/features/reasons/hooks/useReason";
import Loading from "@/app/shared/components/Loading";

function Page() {
  const { info, results, getAllReasons, resetDataReason } = useReasons();
  const initialLoading = useInitialLoading(getAllReasons, resetDataReason);

  if (initialLoading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">
          Lista de razones de devolucion
        </h1>
        <ReasonButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1 mt-2">
        <ReasonTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <ReasonPagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
