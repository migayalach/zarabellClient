"use client";
import { Table } from "antd";
import { IOutput } from "../types";
import OutputButtonModal from "./OutputButtonModal";
import OutputBtnAction from "./OutputBtnAction";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type OutputTableRow = {
  idOutput: number;
  idUser: number;
  idTypeOutput: number;
  idBranch: number;
  nameTypeOutput: string;
  nameUser: string;
  nameBranch: string;
  dateOutput: string;
  codeOutput: string;
};

const columnsOutput = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
    width: 70,
  },
  {
    title: "Usuario",
    dataIndex: "nameUser",
    key: "nameUser",
    width: 180,
  },
  {
    title: "Tipo de salida",
    dataIndex: "nameTypeOutput",
    key: "nameTypeOutput",
    width: 180,
  },
  {
    title: "Sucursal",
    dataIndex: "nameBranch",
    key: "nameBranch",
    width: 180,
  },
  {
    title: "Fecha salida",
    dataIndex: "dateOutput",
    key: "dateOutput",
    width: 180,
  },
  {
    title: "Codigo",
    dataIndex: "codeOutput",
    key: "codeOutput",
    width: 180,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({
      idOutput,
      idUser,
      idTypeOutput,
      idBranch,
    }: {
      idOutput: number;
      idUser: number;
      idTypeOutput: number;
      idBranch: number;
    }) => (
      <div className="flex gap-1">
        <OutputButtonModal
          text="Eliminar"
          action="delete"
          idOutput={idOutput}
        />
        <OutputButtonModal
          text="Editar"
          action="update"
          idOutput={idOutput}
          idUser={idUser}
          idTypeOutput={idTypeOutput}
          idBranch={idBranch}
        />
        <OutputBtnAction idOutput={idOutput} />
      </div>
    ),
  },
];

const outputMapInfo = (data: IOutput[]): OutputTableRow[] => {
  return data?.map(
    (
      {
        idOutput,
        idUser,
        idTypeOutput,
        idBranch,
        nameTypeOutput,
        nameUser,
        nameBranch,
        dateOutput,
        codeOutput,
      }: IOutput,
      index: number,
    ) => ({
      key: idOutput,
      numberItem: index + 1,
      idOutput,
      idUser,
      idBranch,
      idTypeOutput,
      nameTypeOutput,
      nameUser,
      nameBranch,
      dateOutput,
      codeOutput,
    }),
  );
};

function OutputTable({ info }: { info: IOutput[] }) {
  const canCreate = useHasPermission([1]);
  const canUpdate = useHasPermission([1]);
  const canDelete = useHasPermission([1]);

  const columns =
    canCreate || canUpdate || canDelete
      ? columnsOutput
      : columnsOutput.filter((item) => item.key !== "actions");

  return (
    <Table<OutputTableRow>
      columns={columns}
      dataSource={outputMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default OutputTable;
