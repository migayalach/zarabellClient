"use client";

import { Order } from "@/app/helpers/filters.types";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select, Flex, Typography, Form } from "antd";
import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useRoles } from "../../roles/hooks/useRoles";

const { Text } = Typography;

function UserFilter() {
  const { filterUsers, getAllUsers } = useUsers();
  const { getAllRoles, resetDataRole, results } = useRoles();

  const [filter, setFilter] = useState({
    idRol: 0,
    nameUser: "",
    emailUser: "",
    stateUser: true,
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
    filterUsers(filter, 1);
  };

  const handleClear = () => {
    getAllUsers(1);
    setFilter({
      idRol: 0,
      nameUser: "",
      emailUser: "",
      stateUser: true,
      order: Order.ASC,
    });
  };

  useEffect(() => {
    getAllRoles();
    return () => {
      resetDataRole();
    };
  }, []);

  return (
    <Form id="branchFilterForm" onFinish={onFinish} autoComplete="off">
      <Card
        title="Filtros de sucursales"
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
              value={filter.idRol === 0 ? undefined : filter.idRol}
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  idRol: value ?? 0,
                }))
              }
              options={results?.map((role) => ({
                label: role.nameRole,
                value: role.idRole,
              }))}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Nombre</Text>
            <Input
              placeholder="Buscar sucursal"
              style={{ width: 220 }}
              name="nameUser"
              value={filter.nameUser}
              onChange={handleChangeInput}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Email</Text>
            <Input
              placeholder="Buscar email"
              style={{ width: 220 }}
              name="emailUser"
              value={filter.emailUser}
              onChange={handleChangeInput}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Estado</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              placeholder="Todos"
              value={filter.stateUser}
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  stateUser: value,
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

export default UserFilter;
