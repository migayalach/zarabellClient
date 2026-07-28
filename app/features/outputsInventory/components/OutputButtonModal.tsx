"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, DatePicker, DatePickerProps, Form, Input, Modal } from "antd";
import { useUsers } from "../../users/hooks/useUsers";
import { useTOutputs } from "../../typeOutputs/hooks/useTypeOutputs";
import { useOutputActions, useOutput } from "../hooks";
import UserList from "../../users/components/UserList";
import { OutputTypeList } from "../../typeOutputs/components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

type IOutputForm = {
  text: string;
  action: string;
  idTypeOutput?: number;
  idOutput?: number;
  idUser?: number;
};

function OutputButtonModal({
  text,
  action,
  idTypeOutput,
  idOutput,
  idUser,
}: IOutputForm) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getAllUsers, resetDataUser, getOneUser } = useUsers();
  const { getAllTOutputs, resetDataTOutput, getOneTOutput } = useTOutputs();
  const {
    getOneOutputByID,
    createNewOutput,
    deleteOutput,
    updateOutput,
    clearCurrentOutput,
  } = useOutputActions();
  const { currentOutput } = useOutput();

  const [outputData, setOutputData] = useState({
    idOutput: 0,
    idUser: 0,
    idTypeOutput: 0,
    nameTypeOutput: "",
    nameUser: "",
    dateOutput: "",
  });

  const resetOutputHistory = () => {
    setOutputData({
      idOutput: 0,
      idUser: 0,
      idTypeOutput: 0,
      nameTypeOutput: "",
      nameUser: "",
      dateOutput: "",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    getAllUsers();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetDataUser();
    resetDataTOutput();
    clearCurrentOutput();
    resetOutputHistory();
  };

  const handleUserChange = (value: number) => {
    setOutputData((prev) => ({
      ...prev,
      idUser: value,
    }));
  };

  const handleOutputTypeChange = (value: number) => {
    setOutputData((prev) => ({
      ...prev,
      idTypeOutput: value,
    }));
  };

  const onChangeDate =
    (field: keyof typeof outputData): DatePickerProps["onChange"] =>
    (date) => {
      setOutputData((prev) => ({
        ...prev,
        [field]: date && !Array.isArray(date) ? date.format("YYYY-MM-DD") : "",
      }));
    };

  const onFinish = () => {
    if (action === "create") {
      createNewOutput(outputData);
      setIsModalOpen(false);
      resetOutputHistory();
    }
    if (action === "update" && idOutput && idUser && idTypeOutput) {
      updateOutput(outputData);
    }

    if (action === "delete" && idOutput) {
      deleteOutput(idOutput);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idOutput && idUser && idTypeOutput) {
      getOneOutputByID(idOutput);
      getOneUser(idUser);
      getOneTOutput(idTypeOutput);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentOutput) return;
    setOutputData(currentOutput);
  }, [currentOutput, isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {action === "create" && <PlusOutlined />}
        {action === "delete" && <DeleteOutlined />}
        {action === "update" && <FormOutlined />}
      </Button>

      <Modal
        title={`${text} salida`}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnHidden
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="inputRecordForm"
          >
            {action === "create" && "Crear"}
            {action === "delete" && "Eliminar"}
            {action === "update" && "Editar"}
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Form
          id="inputRecordForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          <>
            {action !== "delete" && (
              <>
                <Form.Item label="Usuario">
                  <UserList handleUser={handleUserChange} />
                </Form.Item>

                <Form.Item label="Tipo de salida">
                  <OutputTypeList handleTypeOutput={handleOutputTypeChange} />
                </Form.Item>

                <Form.Item label="Fecha de salida">
                  <DatePicker
                    value={
                      outputData.dateOutput
                        ? dayjs(outputData.dateOutput)
                        : null
                    }
                    onChange={onChangeDate("dateOutput")}
                    minDate={dayjs("2025-01-01", dateFormat)}
                    maxDate={dayjs("2030-12-31", dateFormat)}
                  />
                </Form.Item>
              </>
            )}

            {action === "delete" && (
              <h1>¿Esta seguro que desea eliminar a este registro?</h1>
            )}
          </>
        </Form>
      </Modal>
    </>
  );
}

export default OutputButtonModal;
