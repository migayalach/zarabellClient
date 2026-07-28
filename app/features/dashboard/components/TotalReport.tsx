"use client";
import { ProductFilled, CalendarFilled, RiseOutlined } from "@ant-design/icons";

function TotalReport({ text, info }: { text: string; info: number }) {
  return (
    <div className="w-full md:max-w-87.5 min-h-32 bg-white rounded-2xl shadow-md p-6 flex items-center gap-5 border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
          ${text === "productos" && "bg-sky-100 text-sky-600"}
          ${text === "ventas" && "bg-green-100 text-green-600"}
          ${text === "lotes" && "bg-amber-100 text-amber-400"}        
        `}
      >
        {text === "productos" && <ProductFilled />}
        {text === "ventas" && <RiseOutlined />}
        {text === "lotes" && <CalendarFilled />}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-gray-500 text-lg font-extrabold">
          {text === "productos" && "Total de productos"}
          {text === "ventas" && "Salidas del mes"}
          {text === "lotes" && "Próximos a vencer"}
        </span>

        <h2 className="text-3xl font-bold text-gray-800">{info}</h2>

        <span className="text-gray-400 text-sm">
          {text === "productos" && "Productos registrados"}
          {text === "ventas" && "Total de salidas registradas"}
          {text === "lotes" && "Lotes próximos a vencer"}
        </span>
      </div>
    </div>
  );
}

export default TotalReport;