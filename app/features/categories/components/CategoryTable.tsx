"use client";
import { Table, Tag } from "antd";
import { ICategory } from "../types";
import CategoryButtonModal from "./CategoryButtonModal";

type CategoryTableRow = {
  key: number;
  idCategory: number;
  nameCategory: string;
  stateCategory: boolean;
};

const columnsUsers = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
    width: 70,
  },
  {
    title: "Categoria",
    dataIndex: "nameCategory",
    key: "nameCategory",
    width: 180,
  },
  {
    title: "Estado",
    dataIndex: "stateCategory",
    key: "stateCategory",
    render: (stateCategory: boolean) => {
      const color = stateCategory ? "green" : "volcano";
      const text = stateCategory ? "Habilidato" : "Deshabilitado";
      return <Tag color={color}>{text}</Tag>;
    },
    width: 120,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({ idCategory }: { idCategory: number }) => (
      <div className="flex gap-1">
        <CategoryButtonModal
          text="Editar"
          action="update"
          idCategory={idCategory}
        />
        <CategoryButtonModal
          text="Eliminar"
          action="delete"
          idCategory={idCategory}
        />
      </div>
    ),
  },
];

const usersMapInfo = (data: ICategory[]): CategoryTableRow[] => {
  return data?.map(
    (
      { idCategory, nameCategory, stateCategory }: ICategory,
      index: number,
    ) => ({
      key: idCategory,
      idCategory,
      numberItem: index + 1,
      nameCategory,
      stateCategory,
    }),
  );
};

function CategoryTable({ info }: { info: ICategory[] }) {
  return (
    <Table<CategoryTableRow>
      columns={columnsUsers}
      dataSource={usersMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default CategoryTable;
