"use client";

import { Order } from "@/app/helpers/filters.types";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { Button, Card, Select, Flex, Typography, Form, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useInputRecordActions } from "../hooks/useInputRecordActions";
import { useCategory } from "../../categories/hooks/useCategories";
import { useProducts } from "../../products/hooks/useProducts";
import { useProviders } from "../../providers/hooks/useProvides";
import { IFilterRecordInput } from "../types";

const { Text } = Typography;

function InputRecordFilter() {
  const { filterInputRecords, getAllInputRecords } = useInputRecordActions();
  const {
    getAllCategories,
    resetDataCategory,
    results: categories,
  } = useCategory();
  const { getAllProducts, resetDataProduct, results: products } = useProducts();
  const {
    getAllProviders,
    resetDataProvider,
    results: provider,
  } = useProviders();

  const [filter, setFilter] = useState<IFilterRecordInput>({
    idCategory: undefined,
    idProduct: undefined,
    idProvider: undefined,
    dateInputRecordFrom: undefined,
    dateInputRecordTo: undefined,
    expirationDateFrom: undefined,
    expirationDateTo: undefined,
    stateInputRecord: undefined,
    order: Order.ASC,
  });

  const handleChange = (value: Order) => {
    setFilter((prev) => ({
      ...prev,
      order: value,
    }));
  };

  const onFinish = () => {
    filterInputRecords(filter, 1);
  };

  const handleClear = () => {
    getAllInputRecords(1);
    setFilter({
      idCategory: undefined,
      idProduct: undefined,
      idProvider: undefined,
      dateInputRecordFrom: undefined,
      dateInputRecordTo: undefined,
      expirationDateFrom: undefined,
      expirationDateTo: undefined,
      stateInputRecord: undefined,
      order: Order.ASC,
    });
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
    getAllProviders();
    return () => {
      resetDataCategory();
      resetDataProduct();
      resetDataProvider();
    };
  }, []);

  return (
    <Form id="inputRecordFilterForm" onFinish={onFinish} autoComplete="off">
      <Card
        title="Filtros de entradas"
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
            <Text strong>Rol</Text>
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
              options={categories?.map((category) => ({
                label: category.nameCategory,
                value: category.idCategory,
              }))}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Producto</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              placeholder="Todos"
              value={filter.idProduct === 0 ? undefined : filter.idProduct}
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  idProduct: value ?? undefined,
                }))
              }
              options={products?.map((products) => ({
                label: products.nameProduct,
                value: products.idProduct,
              }))}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Proveedor</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              placeholder="Todos"
              value={filter.idProvider === 0 ? undefined : filter.idProvider}
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  idProvider: value ?? undefined,
                }))
              }
              options={provider?.map((provider) => ({
                label: provider.nameProvider,
                value: provider.idProvider,
              }))}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Fecha de entrada</Text>
            <DatePicker.RangePicker
              placeholder={["Fecha inicial", "Fecha final"]}
              allowEmpty={[false, true]}
              onChange={(dates) => {
                setFilter((prev) => ({
                  ...prev,
                  dateInputRecordFrom: dates?.[0]
                    ? dates[0].format("YYYY-MM-DD")
                    : undefined,
                  dateInputRecordTo: dates?.[1]
                    ? dates[1].format("YYYY-MM-DD")
                    : undefined,
                }));
              }}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Fecha de expiración</Text>
            <DatePicker.RangePicker
              placeholder={["Fecha inicial", "Fecha final"]}
              allowEmpty={[false, true]}
              onChange={(dates) => {
                setFilter((prev) => ({
                  ...prev,
                  expirationDateFrom: dates?.[0]
                    ? dates[0].format("YYYY-MM-DD")
                    : undefined,
                  expirationDateTo: dates?.[1]
                    ? dates[1].format("YYYY-MM-DD")
                    : undefined,
                }));
              }}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Estado</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              placeholder="Todos"
              value={filter.stateInputRecord}
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  stateInputRecord: value ?? undefined,
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

export default InputRecordFilter;
