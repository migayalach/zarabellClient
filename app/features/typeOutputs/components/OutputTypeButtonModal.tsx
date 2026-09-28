"use client";
import { useState, useEffect, useMemo } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { useTOutputs } from "../hooks/useTypeOutputs";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type IOutputTypeForm = {
  text: string;
  action: string;
  idTypeOutput?: number;
};

const initialTOutputInfo = {
  idTypeOutput: 0,
  nameTypeOutput: "",
  descriptionTypeOutput: "",
  prefix: "",
};

type TOutputInfo = typeof initialTOutputInfo;
type ValidatedField = "nameTypeOutput" | "descriptionTypeOutput" | "prefix";
type FieldErrors = Partial<Record<ValidatedField, string>>;

// Solo letras, números, guion y guion bajo (sin espacios)
const PREFIX_REGEX = /^[A-Za-z0-9_-]+$/;

const validateTOutput = (info: TOutputInfo): FieldErrors => {
  const errors: FieldErrors = {};

  // "?? ''" evita errores si el backend devuelve algún campo en null
  const name = (info.nameTypeOutput ?? "").trim();
  if (!name) {
    errors.nameTypeOutput = "Ingresa el nombre del tipo de salida";
  } else if (name.length < 3) {
    errors.nameTypeOutput = "El nombre debe tener al menos 3 caracteres";
  } else if (name.length > 100) {
    errors.nameTypeOutput = "El nombre no puede superar los 100 caracteres";
  }

  const description = (info.descriptionTypeOutput ?? "").trim();
  if (!description) {
    errors.descriptionTypeOutput = "Ingresa la descripción del tipo de salida";
  } else if (description.length < 5) {
    errors.descriptionTypeOutput =
      "La descripción debe tener al menos 5 caracteres";
  } else if (description.length > 200) {
    errors.descriptionTypeOutput =
      "La descripción no puede superar los 200 caracteres";
  }

  const prefix = (info.prefix ?? "").trim();
  if (!prefix) {
    errors.prefix = "Ingresa el prefijo";
  } else if (prefix.length > 10) {
    errors.prefix = "El prefijo no puede superar los 10 caracteres";
  } else if (!PREFIX_REGEX.test(prefix)) {
    errors.prefix =
      "Usa solo letras, números, guion o guion bajo, sin espacios";
  }

  return errors;
};

function OutputTypeButtonModal({
  text,
  action,
  idTypeOutput,
}: IOutputTypeForm) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    createNewTOutput,
    getOneTOutput,
    updateOneTOutput,
    deleteOneTOutput,
    currentTOutput,
    clearDataCurrentTOutput,
  } = useTOutputs();

  const [tOutputInfo, setTOutputInfo] = useState(initialTOutputInfo);
  // Solo mostramos el error de un campo después de que el usuario lo tocó
  const [touched, setTouched] = useState<
    Partial<Record<ValidatedField, boolean>>
  >({});

  const errors = useMemo(() => validateTOutput(tOutputInfo), [tOutputInfo]);
  const isFormValid = Object.keys(errors).length === 0;
  const requiresValidation = action !== "delete";

  const resetTOutputInfo = () => {
    setTOutputInfo(initialTOutputInfo);
    setTouched({});
  };

  const showModal = () => {
    if (action === "create") {
      clearDataCurrentTOutput();
      resetTOutputInfo();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearDataCurrentTOutput();
    resetTOutputInfo();
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
      setTouched({
        nameTypeOutput: true,
        descriptionTypeOutput: true,
        prefix: true,
      });
      return;
    }

    // Enviamos los datos sin espacios sobrantes
    const cleanTOutputInfo: TOutputInfo = {
      ...tOutputInfo,
      nameTypeOutput: (tOutputInfo.nameTypeOutput ?? "").trim(),
      descriptionTypeOutput: (tOutputInfo.descriptionTypeOutput ?? "").trim(),
      prefix: (tOutputInfo.prefix ?? "").trim(),
    };

    setIsSubmitting(true);
    try {
      if (action === "create") {
        await createNewTOutput(cleanTOutputInfo);
        message.success("Tipo de salida creado correctamente");
        setIsModalOpen(false);
        resetTOutputInfo();
      }

      if (action === "update") {
        await updateOneTOutput(cleanTOutputInfo);
        message.success("Tipo de salida actualizado correctamente");
        setIsModalOpen(false);
        clearDataCurrentTOutput();
        resetTOutputInfo();
      }

      if (action === "delete" && idTypeOutput) {
        await deleteOneTOutput(idTypeOutput);
        message.success("Tipo de salida eliminado correctamente");
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
    setTOutputInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idTypeOutput) {
      getOneTOutput(idTypeOutput);
    }
  }, [isModalOpen, action, idTypeOutput]);

  useEffect(() => {
    if (!isModalOpen || action !== "update" || !currentTOutput) return;
    setTOutputInfo(currentTOutput);
  }, [currentTOutput, isModalOpen, action]);

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
            ? "Eliminar tipo de salida"
            : action === "create"
              ? "Crear tipo de salida"
              : "Editar tipo de salida"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "delete" && <DeleteOutlined />}
          {action === "create" && <PlusOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} tipo`}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnHidden
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="typeOutputForm"
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
          id="typeOutputForm"
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
                {...getFieldStatus("nameTypeOutput")}
              >
                <Input
                  name="nameTypeOutput"
                  value={tOutputInfo.nameTypeOutput}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("nameTypeOutput")}
                  maxLength={100}
                />
              </Form.Item>

              <Form.Item
                label="Descripcion"
                required
                {...getFieldStatus("descriptionTypeOutput")}
              >
                <Input
                  name="descriptionTypeOutput"
                  value={tOutputInfo.descriptionTypeOutput}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("descriptionTypeOutput")}
                  maxLength={200}
                />
              </Form.Item>

              <Form.Item label="Prefijo" required {...getFieldStatus("prefix")}>
                <Input
                  name="prefix"
                  value={tOutputInfo.prefix}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("prefix")}
                  maxLength={10}
                />
              </Form.Item>
            </>
          )}

          {action === "delete" && (
            <h1>¿Esta seguro que desea eliminar este tipo de salida?</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default OutputTypeButtonModal;
