"use client";
import {
  BranchButtonModal,
  BranchPagination,
  BranchTable,
} from "@/app/features/branchs/components";
import { useBranchs, useBranchsActions } from "@/app/features/branchs/hooks";
import Loading from "@/app/shared/components/Loading";
import { useInitialLoading } from "@/app/features/auth/hooks/useInitialLoading";

function Page() {
  const { info, results } = useBranchs();
  const { getAllBranchs, resetBranch } = useBranchsActions();
  const initialLoading = useInitialLoading(getAllBranchs, resetBranch);

  if (initialLoading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de sucursales</h1>
        <BranchButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1 mt-2">
        <BranchTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <BranchPagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
