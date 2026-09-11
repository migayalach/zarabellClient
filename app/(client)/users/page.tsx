"use client";

import { useUsers } from "@/app/features/users/hooks/useUsers";
import UserButtonModal from "@/app/features/users/components/UserButtonModal";
import UserPagination from "@/app/features/users/components/UserPagination";
import UserTable from "@/app/features/users/components/UserTable";
import { useRequirePermission } from "@/app/features/auth/hooks/usePermise";
import Loading from "@/app/shared/components/Loading";
import { useInitialLoading } from "@/app/features/auth/hooks/useInitialLoading";
import UserFilter from "@/app/features/users/components/UserFilter";
import FilterDrawer from "@/app/shared/components/FilterDrawer";

function Page() {
  const blocked = useRequirePermission([1, 2]);
  const { info, results, getAllUsers, resetDataUser } = useUsers();

  const initialLoading = useInitialLoading(
    getAllUsers,
    resetDataUser,
    !blocked,
  );

  if (blocked) return null;

  if (initialLoading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[30px] font-bold">Lista de usuarios</h1>

        <UserButtonModal text="Crear" action="create" />
      </div>

      <FilterDrawer title="Filtro de usuarios">
        <UserFilter />
      </FilterDrawer>

      <div className="flex-1 mt-2">
        <UserTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <UserPagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
