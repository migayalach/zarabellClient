"use client";
import { useEffect } from "react";
import { useUsers } from "@/app/features/users/hooks/useUsers";
import UserButtonModal from "@/app/features/users/components/UserButtonModal";
import UserPagination from "@/app/features/users/components/UserPagination";
import UserTable from "@/app/features/users/components/UserTable";
import { useRequirePermission } from "@/app/features/auth/hooks/usePermise";
import Loading from "@/app/shared/components/Loading";

function Page() {
  const blocked = useRequirePermission([1, 2]);
  const { info, results, getAllUsers, resetDataUser, loading } = useUsers();

  useEffect(() => {
    if (!blocked) {
      getAllUsers();
    }

    return () => {
      resetDataUser();
    };
  }, [blocked]);

  if (blocked) return null;
  if (loading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de usuarios</h1>
        <UserButtonModal text="Crear" action="create" />
      </div>

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
