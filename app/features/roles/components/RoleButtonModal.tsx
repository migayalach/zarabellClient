"use client";

import { useEffect, useMemo, useState } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { useRoles } from "../../roles/hooks/useRoles";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type IUserForm = {
  text: string;
  action: string;
  idRole?: number;
};

const initialRoleInfo = {
  idRole: 0,
  nameRole: "",
};

type RoleInfo = typeof initialRoleInfo;
type ValidatedField = "nameRole";
type FieldErrors = Partial<Record<ValidatedField, string>>;

const validateRole = (info: RoleInfo): FieldErrors => {
  const errors: FieldErrors = {};

  // "?? ''" evita errores si el backend devuelve el campo en null
  const name = (info.nameRole ?? "").trim();
  if (!name) {
    errors.nameRole = "Ingresa el nombre del rol";
  } else if (name.length < 3) {
    errors.nameRole = "El nombre debe tener al menos 3 caracteres";
  } else if (name.length > 100) {
    errors.nameRole = "El nombre no puede superar los 100 caracteres";
  }

  return errors;
};

function RoleButtonModal({ text, action, idRole }: IUserForm) {
  const canCreate = useHasPermission([1]);
  const canUpdate = useHasPermission([1]);
  const canDelete = useHasPermission([1]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form] = Form.useForm();

  const { createNewRole, getOneRole, updateOneRole, deleteOneRole } =
    useRoles();

  const [roleInfo, setRoleInfo] = useState(initialRoleInfo);
  // Solo mostramos el error de un campo después de que el usuario lo tocó
  const [touched, setTouched] = useState<
    Partial<Record<ValidatedField, boolean>>
  >({});

  const errors = useMemo(() => validateRole(roleInfo), [roleInfo]);
  const isFormValid = Object.keys(errors).length === 0;
  const requiresValidation = action !== "delete";

  const resetRoleInfo = () => {
    setRoleInfo(initialRoleInfo);
    setTouched({});

    form.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);

    if (action === "create") {
      resetRoleInfo();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetRoleInfo();
  };

  const handleBlur = (field: ValidatedField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRoleInfo((prev) => ({
      ...prev,
      [name]: value,
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
      setTouched({ nameRole: true });
      return;
    }

    // Enviamos el nombre sin espacios sobrantes
    const cleanNameRole = (roleInfo.nameRole ?? "").trim();

    setIsSubmitting(true);
    try {
      if (action === "create") {
        await createNewRole(cleanNameRole);
        message.success("Rol creado correctamente");
        setIsModalOpen(false);
        resetRoleInfo();
        return;
      }

      if (action === "update" && idRole) {
        await updateOneRole({
          idRole,
          nameRole: cleanNameRole,
        });
        message.success("Rol actualizado correctamente");
        return;
      }

      if (action === "delete" && idRole) {
        await deleteOneRole(idRole);
        message.success("Rol eliminado correctamente");
        setIsModalOpen(false);
        resetRoleInfo();
        return;
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
    if (!idRole) return;

    const loadRole = async () => {
      try {
        const result = await getOneRole(idRole);

        setRoleInfo({
          idRole: result.value.idRole,
          nameRole: result.value.nameRole ?? "",
        });
      } catch {
        message.error("No se pudo cargar el rol");
      }
    };

    loadRole();
  }, [isModalOpen, action, idRole]);

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
            ? "Eliminar rol"
            : action === "create"
              ? "Crear rol"
              : "Editar rol"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "create" && <PlusOutlined />}
          {action === "delete" && <DeleteOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} rol`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            loading={isSubmitting}
            disabled={requiresValidation && !isFormValid}
          >
            {action === "create" && "Crear"}
            {action === "delete" && "Eliminar"}
            {action === "update" && "Editar"}
          </Button>,

          <Button key="cancel" onClick={handleCancel} disabled={isSubmitting}>
            Cancelar
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          autoComplete="off"
        >
          {action !== "delete" && (
            <Form.Item label="Nombres" required {...getFieldStatus("nameRole")}>
              <Input
                name="nameRole"
                value={roleInfo.nameRole}
                onChange={handleChangeInput}
                onBlur={() => handleBlur("nameRole")}
                maxLength={100}
              />
            </Form.Item>
          )}

          {action === "delete" && (
            <h1>¿Está seguro que desea eliminar este rol?</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default RoleButtonModal;
