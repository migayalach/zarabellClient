"use client";

import { Order } from "@/app/helpers/filters.types";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select, Flex, Typography, Form } from "antd";
import { useState } from "react";
import { useProviders } from "../hooks/useProvides";

const { Text } = Typography;

function ProviderFilter() {
  const { filterProviders, getAllProviders, clearInfoWatchProvider } =
    useProviders();

  const [filter, setFilter] = useState({
    nameProvider: undefined,
    phoneProvider: undefined,
    stateProvider: undefined,
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
    filterProviders(filter, 1);
  };

  const handleClear = () => {
    getAllProviders(1);
    setFilter({
      nameProvider: undefined,
      phoneProvider: undefined,
      stateProvider: undefined,
      order: Order.ASC,
    });
    clearInfoWatchProvider();
  };

  return (
    <Form id="providerFilterForm" onFinish={onFinish} autoComplete="off">
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
            <Text strong>Nombre</Text>
            <Input
              placeholder="Buscar proveedor"
              style={{ width: 220 }}
              name="nameProvider"
              value={filter.nameProvider}
              onChange={handleChangeInput}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Telefono</Text>
            <Input
              placeholder="Buscar número"
              style={{ width: 220 }}
              name="phoneProvider"
              value={filter.phoneProvider}
              onChange={handleChangeInput}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Estado</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              placeholder="Todos"
              value={filter.stateProvider}
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  stateProvider: value,
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

export default ProviderFilter;
