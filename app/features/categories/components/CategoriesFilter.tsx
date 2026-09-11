"use client";
import { Order } from "@/app/helpers/filters.types";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Select,
  Switch,
  Flex,
  Typography,
  Form,
} from "antd";
import { useState } from "react";
import { useCategory } from "../hooks/useCategories";

const { Text } = Typography;

function CategoriesFilter() {
  const { filterCategories, getAllCategories } = useCategory();
  const [filter, setFilter] = useState({
    nameCategory: "",
    stateCategory: true,
    order: Order.ASC,
  });

  const handleStateChange = (checked: boolean) => {
    setFilter((prev) => ({
      ...prev,
      stateCategory: checked,
    }));
  };

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
    filterCategories(filter, 1);
  };

  const handleClear = () => {
    getAllCategories(1);
    setFilter({
      nameCategory: "",
      stateCategory: true,
      order: Order.ASC,
    });
  };

  return (
    <Form id="categoryFilterForm" onFinish={onFinish} autoComplete="off">
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
              placeholder="Buscar categoria"
              style={{ width: 220 }}
              name="nameCategory"
              value={filter.nameCategory}
              onChange={handleChangeInput}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Estado</Text>
            <Switch
              checked={filter.stateCategory}
              onChange={handleStateChange}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Orden</Text>

            <Select
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

export default CategoriesFilter;
