"use client";
import { ArrowDownOutlined } from "@ant-design/icons";
import { ISalesYesterdayData } from "../types";

function SalesReportYesterday({ info }: { info: ISalesYesterdayData }) {
  return (
    <div className="w-full md:max-w-[350px] min-h-32 bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-2xl text-red-600">
          <ArrowDownOutlined />
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800">Ventas de ayer</h3>
          <p className="text-sm text-gray-400">Resumen diario</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-6">
        <div>
          <p className="text-gray-500 text-sm">Productos vendidos</p>
          <h2 className="text-[18px] font-bold">
            {info.productsSoldYesterday} unidades
          </h2>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Total vendido</p>
          <h2 className="text-[18px] font-bold">
            Bs. {info.totalWinYesterday.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SalesReportYesterday;
