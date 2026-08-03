"use client";
import { Table, Tag } from "antd";
import { IProduct } from "../types";
import ProductButtonModal from "./ProductButtonModal";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type ProductTableRow = {
  key: number;
  idProduct: number;
  idCategory: number;
  nameCategory: string;
  nameProduct: string;
  stateProduct: boolean;
};

const columnsProducts = [
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
    title: "Producto",
    dataIndex: "nameProduct",
    key: "nameProduct",
    width: 180,
  },
  {
    title: "Estado",
    dataIndex: "stateProduct",
    key: "stateProduct",
    render: (stateProduct: boolean) => {
      const color = stateProduct ? "green" : "volcano";
      const text = stateProduct ? "Habilidato" : "Deshabilitado";
      return <Tag color={color}>{text}</Tag>;
    },
    width: 120,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({
      idProduct,
      idCategory,
    }: {
      idProduct: number;
      idCategory: number;
    }) => (
      <div className="flex gap-1">
        <ProductButtonModal
          text="Editar"
          action="update"
          idProduct={idProduct}
          idCategory={idCategory}
        />
        <ProductButtonModal
          text="Eliminar"
          action="delete"
          idProduct={idProduct}
        />
      </div>
    ),
  },
];

const productsMapInfo = (data: IProduct[]): ProductTableRow[] => {
  return data?.map(
    (
      {
        idProduct,
        idCategory,
        nameCategory,
        nameProduct,
        stateProduct,
      }: IProduct,
      index: number,
    ) => ({
      key: idProduct,
      idProduct,
      idCategory,
      numberItem: index + 1,
      nameCategory,
      nameProduct,
      stateProduct,
    }),
  );
};

function ProductTable({ info }: { info: IProduct[] }) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const columns =
    canCreate || canUpdate || canDelete
      ? columnsProducts
      : columnsProducts.filter((item) => item.key !== "actions");

  return (
    <Table<ProductTableRow>
      columns={columns}
      dataSource={productsMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default ProductTable;
