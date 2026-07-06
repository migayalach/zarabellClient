"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Switch,
} from "antd";
import { useOutput, useOutputActions } from "../hooks";
import { useUsers } from "../../users/hooks/useUsers";
import { useTOutputs } from "../../typeOutputs/hooks/useTypeOutputs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

type IOutputForm = {
  text: string;
  action: string;
  idOutput?: number;
  idUser?: number;
  idTypeOutput?: number;
};

function OutputButtonModal({
  text,
  action,
  idOutput,
  idUser,
  idTypeOutput,
}: IOutputForm) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { info, currentOutput, error, loading, results, success } = useOutput();
  const {
    clearCurrentOutput,
    clearErrorOutput,
    createNewOutput,
    deleteOutput,
    getAllOutputs,
    getOneOutputByID,
    resetOutput,
    resetOutputActCreateUpdate,
    updateOutput,
  } = useOutputActions();
  const { getAllUsers, getOneUser } = useUsers();
  const { getAllTOutputs, getOneTOutput } = useTOutputs();

  const [output, setOutput] = useState({
    idOutput: 0,
    idUser: 0,
    idTypeOutput: 0,
    nameTypeOutput: "",
    nameUser: "",
    dateOutput: "",
    codeOutput: "",
  });

  const resetOutputInfo = () => {
    setOutput({
      idOutput: 0,
      idUser: 0,
      idTypeOutput: 0,
      nameTypeOutput: "",
      nameUser: "",
      dateOutput: "",
      codeOutput: "",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    getAllUsers();
    getAllTOutputs();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearCurrentOutput();
  };

  const onFinish = async () => {
    if (action === "create") {
      createNewOutput(output);
      setIsModalOpen(false);
      resetOutputInfo();
    }
    if (action === "update") {
      updateOutput(output);
    }
    if (action === "delete" && idOutput) {
      deleteOutput(idOutput);
      setIsModalOpen(false);
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOutput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserChange = (value: number) => {
    setOutput((prev) => ({
      ...prev,
      idUser: value,
    }));
  };

  const handleTypeOutputChange = (value: number) => {
    setOutput((prev) => ({
      ...prev,
      idTypeOutput: value,
    }));
  };

  const onChangeDate =
    (field: keyof typeof output): DatePickerProps["onChange"] =>
    (date) => {
      setOutput((prev) => ({
        ...prev,
        [field]: date && !Array.isArray(date) ? date.format("YYYY-MM-DD") : "",
      }));
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
    requestAnimationFrame(() => {
      setOutput(currentOutput);
    });
  }, [currentOutput, isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {action === "delete" && <DeleteOutlined />}
        {action === "create" && <PlusOutlined />}
        {action === "update" && <FormOutlined />}
      </Button>

      <Modal
        title={`${text} salida`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="outputForm"
          >
            {action === "delete" && "Eliminar"}
            {action === "create" && "Crear"}
            {action === "update" && "Editar"}
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Form
          id="outputForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          <>
            {action !== "delete" && (
              <>
                <Form.Item label="Usuario" name="user">
                  {/* <CategoryList handleCategory={handleCategory} /> */}
                </Form.Item>

                <Form.Item label="Tipo de salida" name="typeOutput">
                  {/* <ProviderSelect handleProvider={handleProviderChange} /> */}
                </Form.Item>

                <Form.Item label="Fecha de salida">
                  <DatePicker
                    value={output.dateOutput ? dayjs(output.dateOutput) : null}
                    onChange={onChangeDate("dateOutput")}
                    minDate={dayjs("2025-01-01", dateFormat)}
                    maxDate={dayjs("2030-12-31", dateFormat)}
                  />
                </Form.Item>

                <Form.Item label="Codigo de salida"></Form.Item>
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
