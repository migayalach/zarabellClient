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
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";
import { useBranchsActions } from "../../branchs/hooks";
import { BranchList } from "../../branchs/components";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

type IOutputForm = {
  text: string;
  action: string;
  idTypeOutput?: number;
  idOutput?: number;
  idUser?: number;
  idBranch?: number;
};

function OutputButtonModal({
  text,
  action,
  idTypeOutput,
  idOutput,
  idUser,
  idBranch,
}: IOutputForm) {
  const canCreate = useHasPermission([1]);
  const canUpdate = useHasPermission([1]);
  const canDelete = useHasPermission([1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { resetDataUser, getOneUser } = useUsers();
  const { resetDataTOutput, getOneTOutput } = useTOutputs();
  const { resetBranch, getOneBranchByID } = useBranchsActions();
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
    idBranch: 0,
    nameTypeOutput: "",
    nameUser: "",
    nameBranch: "",
    dateOutput: "",
  });

  const resetOutputHistory = () => {
    setOutputData({
      idOutput: 0,
      idUser: 0,
      idTypeOutput: 0,
      idBranch: 0,
      nameTypeOutput: "",
      nameUser: "",
      nameBranch: "",
      dateOutput: "",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetDataUser();
    resetDataTOutput();
    resetBranch();
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

  const handleBranchChange = (value: number) => {
    setOutputData((prev) => ({
      ...prev,
      idBranch: value,
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
    if (action === "update" && idOutput && idUser && idTypeOutput && idBranch) {
      updateOutput(outputData);
    }

    if (action === "delete" && idOutput) {
      deleteOutput(idOutput);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idOutput && idUser && idTypeOutput && idBranch) {
      getOneOutputByID(idOutput);
      getOneUser(idUser);
      getOneTOutput(idTypeOutput);
      getOneBranchByID(idBranch);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentOutput) return;
    setOutputData(currentOutput);
  }, [currentOutput, isModalOpen]);

  if (
    (action === "create" && !canCreate) ||
    (action === "update" && !canUpdate) ||
    (action === "delete" && !canDelete)
  ) {
    return null;
  }

  return (
    <>
      <CustomTooltip
        text={
          action === "delete"
            ? "Eliminar salida"
            : action === "create"
              ? "Crear salida"
              : "Editar salida"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "create" && <PlusOutlined />}
          {action === "delete" && <DeleteOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

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

                <Form.Item label="Sucursal">
                  <BranchList handleBranch={handleBranchChange} />
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
