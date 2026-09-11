"use client";

import { Order } from "@/app/helpers/filters.types";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { Button, Card, Select, Flex, Typography, Form, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { IFilterOutputs } from "../types";
import { useOutputActions } from "../hooks";
import { useBranchs, useBranchsActions } from "../../branchs/hooks";
import { useTOutputs } from "../../typeOutputs/hooks/useTypeOutputs";
import { useUsers } from "../../users/hooks/useUsers";

const { Text } = Typography;

function OutputFilters() {
  const { filteroutputs, getAllOutputs } = useOutputActions();
  const { getAllBranchs, resetBranch } = useBranchsActions();
  const { results: branchs } = useBranchs();
  const { getAllTOutputs, resetDataTOutput, results: tOutputs } = useTOutputs();
  const { getAllUsers, resetDataUser, results: users } = useUsers();

  const [filter, setFilter] = useState<IFilterOutputs>({
    idBranch: undefined,
    idTypeOutput: undefined,
    idUser: undefined,
    dateOutputFrom: undefined,
    dateOutputTo: undefined,
    order: Order.ASC,
  });

  const handleChange = (value: Order) => {
    setFilter((prev) => ({
      ...prev,
      order: value,
    }));
  };

  const onFinish = () => {
    filteroutputs(filter, 1);
  };

  const handleClear = () => {
    getAllOutputs(1);
    setFilter({
      idBranch: undefined,
      idTypeOutput: undefined,
      idUser: undefined,
      dateOutputFrom: undefined,
      dateOutputTo: undefined,
      order: Order.ASC,
    });
  };

  useEffect(() => {
    getAllBranchs();
    getAllTOutputs();
    getAllUsers();
    return () => {
      resetBranch();
      resetDataTOutput();
      resetDataUser();
    };
  }, []);

  return (
    <Form id="outputFilterForm" onFinish={onFinish} autoComplete="off">
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
            <Text strong>Sucursal</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              placeholder="Todos"
              value={filter.idBranch === 0 ? undefined : filter.idBranch}
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  idBranch: value ?? undefined,
                }))
              }
              options={branchs?.map((branchs) => ({
                label: branchs.nameBranch,
                value: branchs.idBranch,
              }))}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Tipos de salida</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              placeholder="Todos"
              value={
                filter.idTypeOutput === 0 ? undefined : filter.idTypeOutput
              }
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  idTypeOutput: value ?? undefined,
                }))
              }
              options={tOutputs?.map((tOutput) => ({
                label: tOutput.nameTypeOutput,
                value: tOutput.idTypeOutput,
              }))}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Usuarios</Text>
            <Select
              allowClear
              style={{ width: 160 }}
              placeholder="Todos"
              value={filter.idUser === 0 ? undefined : filter.idUser}
              onChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  idUser: value ?? undefined,
                }))
              }
              options={users?.map((users) => ({
                label: users.nameUser,
                value: users.idUser,
              }))}
            />
          </Flex>

          <Flex vertical gap={6}>
            <Text strong>Fecha de salida</Text>
            <DatePicker.RangePicker
              placeholder={["Fecha inicial", "Fecha final"]}
              allowEmpty={[false, true]}
              onChange={(dates) => {
                setFilter((prev) => ({
                  ...prev,
                  dateOutputFrom: dates?.[0]
                    ? dates[0].format("YYYY-MM-DD")
                    : undefined,
                  dateOutputTo: dates?.[1]
                    ? dates[1].format("YYYY-MM-DD")
                    : undefined,
                }));
              }}
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

export default OutputFilters;
