import React, { useEffect, useState } from "react";
import { message } from "antd";
import { usePriceHistoryActions } from "../hooks";
import { IPriceHistory } from "../types";

function PriceHistoryTable({
  idInputRecord,
  infoPH,
}: {
  idInputRecord: number;
  infoPH: IPriceHistory[];
}) {
  const [data, setData] = useState<IPriceHistory[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [backupData, setBackupData] = useState<IPriceHistory | null>(null);
  const { createNewPriceHistory, updatePriceHistory } =
    usePriceHistoryActions();

  const onChangeEdit = (id: number) => {
    const item = data.find((x) => x.idPriceHistory === id);
    if (!item) return;
    setBackupData(item);
    setEditId(id);
  };

  const onChangeCreate = async () => {
    const lastIndex = infoPH.length - 1;
    if (
      infoPH[lastIndex].unitPriceHistory === 0 ||
      infoPH[lastIndex].quarterPriceHistory === 0 ||
      infoPH[lastIndex].dozenPriceHistory === 0 ||
      infoPH[lastIndex].mayorPriceHistory === 0
    ) {
      message.error("Para crear un nuevo registro asigna precios");
      return;
    }

    createNewPriceHistory({
      idInputRecord,
      dateStartHistory: new Date().toISOString(),
      unitPriceHistory: 0,
      quarterPriceHistory: 0,
      dozenPriceHistory: 0,
      mayorPriceHistory: 0,
      detailHistory: "",
    });
  };

  const onChangeCancel = () => {
    if (!backupData) return;
    setData((prev) =>
      prev.map((item) =>
        item.idPriceHistory === backupData.idPriceHistory ? backupData : item,
      ),
    );

    setEditId(null);
  };

  const onChangeSave = () => {
    const item = data.find((x) => x.idPriceHistory === editId);
    if (!item) return;
    updatePriceHistory({
      ...item,
      unitPriceHistory: Number(item.unitPriceHistory),
      quarterPriceHistory: Number(item.quarterPriceHistory),
      dozenPriceHistory: Number(item.dozenPriceHistory),
      mayorPriceHistory: Number(item.mayorPriceHistory),
    });
    setEditId(null);
  };

  const onChangeField = (
    id: number,
    field: string,
    value: IPriceHistory[keyof IPriceHistory],
  ) => {
    setData((prev) =>
      prev.map((item) =>
        item.idPriceHistory === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  useEffect(() => {
    if (infoPH) {
      setData(infoPH);
    }
  }, [infoPH]);

  return (
    <div className="overflow-x-auto p-4">
      <button
        onClick={onChangeCreate}
        className="mb-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Crear
      </button>

      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">N°</th>
            <th className="border px-3 py-2">Fecha inicio</th>
            <th className="border px-3 py-2">Fecha fin</th>
            <th className="border px-3 py-2">Precio unitario</th>
            <th className="border px-3 py-2">Precio quarta</th>
            <th className="border px-3 py-2">Precio docena</th>
            <th className="border px-3 py-2">Precio mayor</th>
            <th className="border px-3 py-2">Detalle</th>
            <th className="border px-3 py-2">Accion</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item, index) => {
            const isEdit = editId === item.idPriceHistory;
            return (
              <tr
                key={item.idPriceHistory}
                className={isEdit ? "bg-blue-50" : "hover:bg-gray-50"}
              >
                <td className="border px-3 py-2">{index + 1}</td>

                <td className="border px-3 py-2">
                  {isEdit ? (
                    <input
                      className="w-full border rounded px-2 py-1"
                      value={item.dateStartHistory}
                      onChange={(e) =>
                        onChangeField(
                          item.idPriceHistory,
                          "dateStartHistory",
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    item.dateStartHistory
                  )}
                </td>

                <td className="border px-3 py-2">
                  {isEdit ? (
                    <input
                      className="w-full border rounded px-2 py-1"
                      value={item.dateEndHistory}
                      onChange={(e) =>
                        onChangeField(
                          item.idPriceHistory,
                          "dateEndHistory",
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    item.dateEndHistory
                  )}
                </td>

                <td className="border px-3 py-2">
                  {isEdit ? (
                    <input
                      className="w-full border rounded px-2 py-1"
                      value={item.unitPriceHistory}
                      onChange={(e) =>
                        onChangeField(
                          item.idPriceHistory,
                          "unitPriceHistory",
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    item.unitPriceHistory
                  )}
                </td>

                <td className="border px-3 py-2">
                  {isEdit ? (
                    <input
                      className="w-full border rounded px-2 py-1"
                      value={item.quarterPriceHistory}
                      onChange={(e) =>
                        onChangeField(
                          item.idPriceHistory,
                          "quarterPriceHistory",
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    item.quarterPriceHistory
                  )}
                </td>

                <td className="border px-3 py-2">
                  {isEdit ? (
                    <input
                      className="w-full border rounded px-2 py-1"
                      value={item.dozenPriceHistory}
                      onChange={(e) =>
                        onChangeField(
                          item.idPriceHistory,
                          "dozenPriceHistory",
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    item.dozenPriceHistory
                  )}
                </td>

                <td className="border px-3 py-2">
                  {isEdit ? (
                    <input
                      className="w-full border rounded px-2 py-1"
                      value={item.mayorPriceHistory}
                      onChange={(e) =>
                        onChangeField(
                          item.idPriceHistory,
                          "mayorPriceHistory",
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    item.mayorPriceHistory
                  )}
                </td>

                <td className="border px-3 py-2">
                  {isEdit ? (
                    <input
                      className="w-full border rounded px-2 py-1"
                      value={item.detailHistory}
                      onChange={(e) =>
                        onChangeField(
                          item.idPriceHistory,
                          "detailHistory",
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    item.detailHistory
                  )}
                </td>

                <td className="border px-3 py-2">
                  {!isEdit ? (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => onChangeEdit(item.idPriceHistory)}
                    >
                      Editar
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded"
                        onClick={onChangeSave}
                      >
                        Guardar
                      </button>

                      <button
                        className="px-2 py-1 bg-gray-400 text-white rounded"
                        onClick={onChangeCancel}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PriceHistoryTable;
