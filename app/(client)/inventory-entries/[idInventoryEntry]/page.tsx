"use client";
import React, { useEffect } from "react";
import {
  usePriceHistory,
  usePriceHistoryActions,
} from "@/app/features/priceHistory/hooks";
import {
  PriceHistoryPagination,
  PriceHistoryTable,
} from "@/app/features/priceHistory/components";
import { useRequirePermission } from "@/app/features/auth/hooks/usePermise";
import Loading from "@/app/shared/components/Loading";

interface IParams {
  params: Promise<{
    idInventoryEntry: string;
  }>;
}

function Page({ params }: IParams) {
  const blocked = useRequirePermission([1, 2]);
  const { idInventoryEntry } = React.use(params);
  const { info, results, loading } = usePriceHistory();
  const { getAllPriceHistory, resetPriceHistory } = usePriceHistoryActions();

  useEffect(() => {
    if (!blocked) {
      getAllPriceHistory(+idInventoryEntry);
    }
    return () => {
      resetPriceHistory();
    };
  }, [blocked]);

  if (blocked) return null;
  if (loading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Historial de precios</h1>
      </div>

      <div className="flex-1 mt-2">
        <PriceHistoryTable idInputRecord={+idInventoryEntry} infoPH={results} />
      </div>

      <div className="flex justify-center mt-6">
        <PriceHistoryPagination
          idInputRecord={+idInventoryEntry}
          pages={info?.pages ?? 1}
        />
      </div>
    </div>
  );
}

export default Page;
