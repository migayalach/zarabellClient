"use client";
import { useState, useEffect, useMemo } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { useReasons } from "../hooks/useReason";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type IReasonForm = {
  text: string;
  action: string;
  idReason?: number;
};

const initialReasonInfo = {
  idReason: 0,
  nameReason: "",
  descriptionReason: "",
};

type ReasonInfo = typeof initialReasonInfo;
type ValidatedField = "nameReason" | "descriptionReason";
type FieldErrors = Partial<Record<ValidatedField, string>>;

const validateReason = (info: ReasonInfo): FieldErrors => {
  const errors: FieldErrors = {};

  // "?? ''" evita errores si el backend devuelve algún campo en null
  const name = (info.nameReason ?? "").trim();
  if (!name) {
    errors.nameReason = "Ingresa el nombre de la razón";
  } else if (name.length < 3) {
    errors.nameReason = "El nombre debe tener al menos 3 caracteres";
  } else if (name.length > 100) {
    errors.nameReason = "El nombre no puede superar los 100 caracteres";
  }

  const description = (info.descriptionReason ?? "").trim();
  if (!description) {
    errors.descriptionReason = "Ingresa la descripción de la razón";
  } else if (description.length < 5) {
    errors.descriptionReason =
      "La descripción debe tener al menos 5 caracteres";
  } else if (description.length > 200) {
    errors.descriptionReason =
      "La descripción no puede superar los 200 caracteres";
  }

  return errors;
};

function ReasonButtonModal({ text, action, idReason }: IReasonForm) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    createNewReason,
    getOneReason,
    updateOneReason,
    deleteOneReason,
    currentReason,
    clearDataCurrentReason,
  } = useReasons();

  const [reasonInfo, setReasonInfo] = useState(initialReasonInfo);
  // Solo mostramos el error de un campo después de que el usuario lo tocó
  const [touched, setTouched] = useState<
    Partial<Record<ValidatedField, boolean>>
  >({});

  const errors = useMemo(() => validateReason(reasonInfo), [reasonInfo]);
  const isFormValid = Object.keys(errors).length === 0;
  const requiresValidation = action !== "delete";

  const resetReasonInfo = () => {
    setReasonInfo(initialReasonInfo);
    setTouched({});
  };

  const showModal = () => {
    if (action === "create") {
      clearDataCurrentReason();
      resetReasonInfo();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearDataCurrentReason();
    resetReasonInfo();
  };

  const handleBlur = (field: ValidatedField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Devuelve el estado y el mensaje que espera Form.Item para cada campo
  const getFieldStatus = (field: ValidatedField) => {
    const hasError = touched[field] && errors[field];
    return {
      validateStatus: hasError ? ("error" as const) : ("" as const),
      help: hasError ? errors[field] : undefined,
    };
  };

  const onFinish = async () => {
    // Protección extra: aunque el botón esté deshabilitado, Enter no debe enviar datos inválidos
    if (requiresValidation && !isFormValid) {
      setTouched({ nameReason: true, descriptionReason: true });
      return;
    }

    // Enviamos los datos sin espacios sobrantes
    const cleanReasonInfo: ReasonInfo = {
      ...reasonInfo,
      nameReason: (reasonInfo.nameReason ?? "").trim(),
      descriptionReason: (reasonInfo.descriptionReason ?? "").trim(),
    };

    setIsSubmitting(true);
    try {
      if (action === "create") {
        await createNewReason(cleanReasonInfo);
        message.success("Razón creada correctamente");
        setIsModalOpen(false);
        resetReasonInfo();
      }

      if (action === "update") {
        await updateOneReason(cleanReasonInfo);
        message.success("Razón actualizada correctamente");
        setIsModalOpen(false);
        clearDataCurrentReason();
        resetReasonInfo();
      }

      if (action === "delete" && idReason) {
        await deleteOneReason(idReason);
        message.success("Razón eliminada correctamente");
        setIsModalOpen(false);
      }
    } catch {
      message.error("No se pudo realizar la operación");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setReasonInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idReason) {
      getOneReason(idReason);
    }
  }, [isModalOpen, action, idReason]);

  useEffect(() => {
    if (!isModalOpen || action !== "update" || !currentReason) return;
    setReasonInfo(currentReason);
  }, [currentReason, isModalOpen, action]);

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
            ? "Eliminar razón"
            : action === "create"
              ? "Crear razón"
              : "Editar razón"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "delete" && <DeleteOutlined />}
          {action === "create" && <PlusOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} razon`}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnHidden
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="reasonForm"
            loading={isSubmitting}
            disabled={requiresValidation && !isFormValid}
          >
            {action === "delete" && "Eliminar"}
            {action === "create" && "Crear"}
            {action === "update" && "Editar"}
          </Button>,
          <Button key="cancel" onClick={handleCancel} disabled={isSubmitting}>
            Cancelar
          </Button>,
        ]}
      >
        <Form
          id="reasonForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          {action !== "delete" && (
            <>
              <Form.Item
                label="Nombres"
                required
                {...getFieldStatus("nameReason")}
              >
                <Input
                  name="nameReason"
                  value={reasonInfo.nameReason}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("nameReason")}
                  maxLength={100}
                />
              </Form.Item>

              <Form.Item
                label="Descripcion"
                required
                {...getFieldStatus("descriptionReason")}
              >
                <Input
                  name="descriptionReason"
                  value={reasonInfo.descriptionReason}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("descriptionReason")}
                  maxLength={200}
                />
              </Form.Item>
            </>
          )}

          {action === "delete" && (
            <h1>¿Esta seguro que desea eliminar a esta razon?</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default ReasonButtonModal;
