"use client";
import { useInitialLoading } from "@/app/features/auth/hooks/useInitialLoading";
import {
  MagazinePagination,
  MagazinPDF,
  PHListMagazine,
} from "@/app/features/priceHistory/components";
import {
  usePriceHistory,
  usePriceHistoryActions,
} from "@/app/features/priceHistory/hooks";
import Loading from "@/app/shared/components/Loading";

function Page() {
  const { info, resultsMagazine } = usePriceHistory();
  const { getProductMagazine, resetMagazine } = usePriceHistoryActions();
  const initialLoading = useInitialLoading(getProductMagazine, resetMagazine);

  if (initialLoading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de productos</h1>
        <MagazinPDF />
      </div>

      <div className="flex-1 mt-2">
        <PHListMagazine info={resultsMagazine} />
      </div>

      <div className="flex justify-center mt-6">
        <MagazinePagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
