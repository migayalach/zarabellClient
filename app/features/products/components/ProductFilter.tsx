"use client";

import { Order } from "@/app/helpers/filters.types";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select, Flex, Typography, Form } from "antd";
import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCategory } from "../../categories/hooks/useCategories";

const { Text } = Typography;

function ProductFilter() {
  const { filterProducts, getAllProducts, clearInfoWatchProduct } =
    useProducts();
  const { getAllCategories, resetDataCategory, results } = useCategory();

  const [filter, setFilter] = useState({
    idCategory: undefined,
    nameProduct: undefined,
    stateProduct: undefined,
    order: Order.ASC,
  });

  const handleChange = (value: Order) => {
    setFilter((prev) => ({
      ...prev,
      order: value,
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onFinish = () => {
    filterProducts(filter, 1);
  };

  const handleClear = () => {
    getAllProducts(1);
    setFilter({
      idCategory: undefined,
      nameProduct: undefined,
      stateProduct: undefined,
      order: Order.ASC,
    });
    clearInfoWatchProduct();
    resetDataCategory();
  };

  useEffect(() => {
    getAllCategories();
    return () => {
      resetDataCategory();
    };
  }, []);

  return (
    <Form id="productFilterForm" onFinish={onFinish} autoComplete="off">
      <Card
        styles={{
          body: {
            padding: "20px",
          },
        }}
        style={{
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Flex align="end" gap={16} wrap="wrap">
          <Flex vertical gap={6}>
            <Text strong>Categoria</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              placeholder="Todos"
              value={filter.idCategory === 0 ? undefined : filter.idCategory}
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  idCategory: value ?? undefined,
                }))
              }
              options={results?.map((category) => ({
                label: category.nameCategory,
                value: category.idCategory,
              }))}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Producto</Text>
            <Input
              placeholder="Buscar producto"
              style={{ width: 220 }}
              name="nameProduct"
              value={filter.nameProduct}
              onChange={handleChangeInput}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Estado</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              placeholder="Todos"
              value={filter.stateProduct}
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  stateProduct: value,
                }))
              }
              options={[
                { label: "Activos", value: true },
                { label: "Inactivos", value: false },
              ]}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Orden</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              value={filter.order}
              onChange={handleChange}
              options={[
                {
                  value: Order.ASC,
                  label: "Ascendente",
                },
                {
                  value: Order.DESC,
                  label: "Descendente",
                },
              ]}
            />
          </Flex>

          <Flex gap={8}>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Buscar
            </Button>

            <Button icon={<ClearOutlined />} onClick={handleClear}>
              Limpiar
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Form>
  );
}

export default ProductFilter;
