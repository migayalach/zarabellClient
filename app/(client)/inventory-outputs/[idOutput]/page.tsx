"use client";
import React, { useEffect } from "react";
import {
  useOutputHistory,
  useOutputHistoryActions,
} from "@/app/features/outputHistory/hooks";
import {
  OutputHistoryPagination,
  OutputHistoryTable,
  OutputHistoryModalAction,
} from "@/app/features/outputHistory/components";

interface IParams {
  params: Promise<{
    idOutput: string;
  }>;
}

function Page({ params }: IParams) {
  const { idOutput } = React.use(params);
  const { info, results } = useOutputHistory();
  const { getAllOutputHistory } = useOutputHistoryActions();

  useEffect(() => {
    getAllOutputHistory(+idOutput);
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Historial de salidas</h1>
        <OutputHistoryModalAction text="Crear" action="create" />
      </div>

      <div className="flex-1 mt-2">
        <OutputHistoryTable infoOH={results} />
      </div>

      <div className="flex justify-center mt-6">
        <OutputHistoryPagination
          idOutput={+idOutput}
          pages={info?.pages ?? 1}
        />
      </div>
    </div>
  );
}

export default Page;
