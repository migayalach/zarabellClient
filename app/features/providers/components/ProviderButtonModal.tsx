"use client";
import { useState, useEffect, useMemo } from "react";
import {
  DeleteOutlined,
  UserAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Switch, message } from "antd";
import { useProviders } from "../hooks/useProvides";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type IProviderForm = {
  text: string;
  action: string;
  idProvider?: number;
};

type ProviderInfo = {
  idProvider: number;
  nameProvider: string;
  phoneProvider: string;
  emailProvider: string;
  stateProvider: boolean;
};

type ValidatedField = "nameProvider" | "emailProvider" | "phoneProvider";
type FieldErrors = Partial<Record<ValidatedField, string>>;

const initialProviderInfo: ProviderInfo = {
  idProvider: 0,
  nameProvider: "",
  phoneProvider: "",
  emailProvider: "",
  stateProvider: true,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Acepta un "+" opcional al inicio y entre 7 y 15 dígitos (sin contar espacios ni guiones)
const PHONE_REGEX = /^\+?\d{7,15}$/;

const validateProvider = (info: ProviderInfo): FieldErrors => {
  const errors: FieldErrors = {};

  const name = info.nameProvider.trim();
  if (!name) {
    errors.nameProvider = "Ingresa el nombre del proveedor";
  } else if (name.length < 3) {
    errors.nameProvider = "El nombre debe tener al menos 3 caracteres";
  } else if (name.length > 100) {
    errors.nameProvider = "El nombre no puede superar los 100 caracteres";
  }

  const email = info.emailProvider.trim();
  if (!email) {
    errors.emailProvider = "Ingresa el email del proveedor";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.emailProvider =
      "Ingresa un email válido, por ejemplo nombre@correo.com";
  } else if (email.length > 100) {
    errors.emailProvider = "El email no puede superar los 100 caracteres";
  }

  const phone = info.phoneProvider.replace(/[\s-]/g, "");
  if (!phone) {
    errors.phoneProvider = "Ingresa el celular o teléfono del proveedor";
  } else if (!PHONE_REGEX.test(phone)) {
    errors.phoneProvider = "Usa solo números, entre 7 y 15 dígitos";
  }

  return errors;
};

function ProviderButtonModal({ text, action, idProvider }: IProviderForm) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    createNewProvider,
    getOneProvider,
    updateOneProvider,
    deleteOneProvider,
    clearDataCurrentProvider,
  } = useProviders();

  const [providerInfo, setProviderInfo] = useState(initialProviderInfo);
  // Solo mostramos el error de un campo después de que el usuario lo tocó
  const [touched, setTouched] = useState<
    Partial<Record<ValidatedField, boolean>>
  >({});

  const errors = useMemo(() => validateProvider(providerInfo), [providerInfo]);
  const isFormValid = Object.keys(errors).length === 0;
  const requiresValidation = action !== "delete";

  const resetProviderInfo = () => {
    setProviderInfo(initialProviderInfo);
    setTouched({});
  };

  const showModal = () => {
    if (action === "create") {
      resetProviderInfo();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearDataCurrentProvider();
    resetProviderInfo();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setProviderInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBlur = (field: ValidatedField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleStateChange = (checked: boolean) => {
    setProviderInfo((prev) => ({
      ...prev,
      stateProvider: checked,
    }));
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
        nameProvider: true,
        emailProvider: true,
        phoneProvider: true,
      });
      return;
    }

    // Enviamos los datos sin espacios sobrantes
    const cleanProviderInfo: ProviderInfo = {
      ...providerInfo,
      nameProvider: providerInfo.nameProvider.trim(),
      emailProvider: providerInfo.emailProvider.trim(),
      phoneProvider: providerInfo.phoneProvider.trim(),
    };

    setIsSubmitting(true);
    try {
      if (action === "create") {
        await createNewProvider(cleanProviderInfo);
        message.success("Proveedor creado correctamente");
        setIsModalOpen(false);
        resetProviderInfo();
      }

      if (action === "update") {
        await updateOneProvider(cleanProviderInfo);
        message.success("Proveedor actualizado correctamente");
        setIsModalOpen(false);
        clearDataCurrentProvider();
        resetProviderInfo();
      }

      if (action === "delete" && idProvider) {
        await deleteOneProvider(idProvider);
        message.success("Proveedor eliminado correctamente");
        setIsModalOpen(false);
      }
    } catch {
      message.error("No se pudo realizar la operación");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action !== "update") return;
    if (!idProvider) return;

    const loadProvider = async () => {
      try {
        const result = await getOneProvider(idProvider);
        setProviderInfo({
          idProvider: result.value.idProvider,
          nameProvider: result.value.nameProvider ?? "",
          phoneProvider: result.value.phoneProvider ?? "",
          emailProvider: result.value.emailProvider ?? "",
          stateProvider: result.value.stateProvider,
        });
      } catch {
        message.error("No se pudo cargar el proveedor");
      }
    };

    loadProvider();
  }, [isModalOpen, action, idProvider]);

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
            ? "Eliminar proveedor"
            : action === "create"
              ? "Crear proveedor"
              : "Editar proveedor"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "delete" && <DeleteOutlined />}
          {action === "create" && <UserAddOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} proveedor`}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnHidden
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="providerForm"
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
          id="providerForm"
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
                {...getFieldStatus("nameProvider")}
              >
                <Input
                  name="nameProvider"
                  value={providerInfo.nameProvider}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("nameProvider")}
                  maxLength={100}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                required
                {...getFieldStatus("emailProvider")}
              >
                <Input
                  name="emailProvider"
                  value={providerInfo.emailProvider}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("emailProvider")}
                  inputMode="email"
                  maxLength={100}
                />
              </Form.Item>

              <Form.Item
                label="Celular / Telefono"
                required
                {...getFieldStatus("phoneProvider")}
              >
                <Input
                  name="phoneProvider"
                  value={providerInfo.phoneProvider}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("phoneProvider")}
                  inputMode="tel"
                  maxLength={20}
                />
              </Form.Item>

              {action === "update" && (
                <Form.Item label="Estado">
                  <Switch
                    checked={providerInfo.stateProvider}
                    onChange={handleStateChange}
                  />
                </Form.Item>
              )}
            </>
          )}

          {action === "delete" && (
            <h1>Esta seguro que desea eliminar a este proveedor</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default ProviderButtonModal;
