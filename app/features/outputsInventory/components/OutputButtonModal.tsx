"use client";
import { useState, useEffect, useMemo } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, DatePicker, DatePickerProps, Form, Modal } from "antd";
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
const MIN_DATE = dayjs("2025-01-01", dateFormat);
const MAX_DATE = dayjs("2030-12-31", dateFormat);

type IOutputForm = {
  text: string;
  action: string;
  idTypeOutput?: number;
  idOutput?: number;
  idUser?: number;
  idBranch?: number;
};

const initialOutputData = {
  idOutput: 0,
  idUser: 0,
  idTypeOutput: 0,
  idBranch: 0,
  nameTypeOutput: "",
  nameUser: "",
  nameBranch: "",
  dateOutput: "",
};

type OutputData = typeof initialOutputData;
type ValidatedField = "idUser" | "idTypeOutput" | "idBranch" | "dateOutput";
type FieldErrors = Partial<Record<ValidatedField, string>>;

const ALL_FIELDS_TOUCHED: Record<ValidatedField, boolean> = {
  idUser: true,
  idTypeOutput: true,
  idBranch: true,
  dateOutput: true,
};

const validateOutput = (data: OutputData): FieldErrors => {
  const errors: FieldErrors = {};

  if (!data.idUser) {
    errors.idUser = "Selecciona un usuario";
  }

  if (!data.idTypeOutput) {
    errors.idTypeOutput = "Selecciona un tipo de salida";
  }

  if (!data.idBranch) {
    errors.idBranch = "Selecciona una sucursal";
  }

  if (!data.dateOutput) {
    errors.dateOutput = "Selecciona la fecha de salida";
  }

  return errors;
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

  const [outputData, setOutputData] = useState(initialOutputData);
  // Solo mostramos el error de un campo después de que el usuario lo tocó
  const [touched, setTouched] = useState<
    Partial<Record<ValidatedField, boolean>>
  >({});

  const errors = useMemo(() => validateOutput(outputData), [outputData]);
  const isFormValid = Object.keys(errors).length === 0;
  const requiresValidation = action !== "delete";

  const resetOutputHistory = () => {
    setOutputData(initialOutputData);
    setTouched({});
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

  const handleBlur = (field: ValidatedField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleUserChange = (value: number) => {
    setOutputData((prev) => ({
      ...prev,
      idUser: value,
    }));
    handleBlur("idUser");
  };

  const handleOutputTypeChange = (value: number) => {
    setOutputData((prev) => ({
      ...prev,
      idTypeOutput: value,
    }));
    handleBlur("idTypeOutput");
  };

  const handleBranchChange = (value: number) => {
    setOutputData((prev) => ({
      ...prev,
      idBranch: value,
    }));
    handleBlur("idBranch");
  };

  const onChangeDate =
    (field: "dateOutput"): DatePickerProps["onChange"] =>
    (date) => {
      setOutputData((prev) => ({
        ...prev,
        [field]: date && !Array.isArray(date) ? date.format("YYYY-MM-DD") : "",
      }));
      handleBlur(field);
    };

  // Devuelve el estado y el mensaje que espera Form.Item para cada campo
  const getFieldStatus = (field: ValidatedField) => {
    const hasError = touched[field] && errors[field];
    return {
      validateStatus: hasError ? ("error" as const) : ("" as const),
      help: hasError ? errors[field] : undefined,
    };
  };

  const onFinish = () => {
    // Protección extra: aunque el botón esté deshabilitado, Enter no debe enviar datos inválidos
    if (requiresValidation && !isFormValid) {
      setTouched(ALL_FIELDS_TOUCHED);
      return;
    }

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
            disabled={requiresValidation && !isFormValid}
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
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          <>
            {action !== "delete" && (
              <>
                <Form.Item
                  label="Usuario"
                  required
                  {...getFieldStatus("idUser")}
                >
                  <div onBlur={() => handleBlur("idUser")}>
                    <UserList handleUser={handleUserChange} />
                  </div>
                </Form.Item>

                <Form.Item
                  label="Tipo de salida"
                  required
                  {...getFieldStatus("idTypeOutput")}
                >
                  <div onBlur={() => handleBlur("idTypeOutput")}>
                    <OutputTypeList handleTypeOutput={handleOutputTypeChange} />
                  </div>
                </Form.Item>

                <Form.Item
                  label="Sucursal"
                  required
                  {...getFieldStatus("idBranch")}
                >
                  <div onBlur={() => handleBlur("idBranch")}>
                    <BranchList handleBranch={handleBranchChange} />
                  </div>
                </Form.Item>

                <Form.Item
                  label="Fecha de salida"
                  required
                  {...getFieldStatus("dateOutput")}
                >
                  <DatePicker
                    value={
                      outputData.dateOutput
                        ? dayjs(outputData.dateOutput)
                        : null
                    }
                    onChange={onChangeDate("dateOutput")}
                    onBlur={() => handleBlur("dateOutput")}
                    minDate={MIN_DATE}
                    maxDate={MAX_DATE}
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
