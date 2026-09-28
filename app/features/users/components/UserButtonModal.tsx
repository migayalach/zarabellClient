"use client";

import { useState, useEffect, useMemo } from "react";
import {
  DeleteOutlined,
  UserAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Switch, message } from "antd";
import { useUsers } from "../hooks/useUsers";
import RoleSelect from "../../roles/components/RoleSelect";
import { useRoles } from "../../roles/hooks/useRoles";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type IUserForm = {
  text: string;
  action: string;
  idUser?: number;
};

const initialUserInfo = {
  idUser: 0,
  idRole: 1,
  nameRole: "",
  nameUser: "",
  lastNameUser: "",
  emailUser: "",
  phoneUser: "",
  stateUser: true,
};

type UserInfo = typeof initialUserInfo;
type ValidatedField =
  | "idRole"
  | "nameUser"
  | "lastNameUser"
  | "emailUser"
  | "phoneUser";
type FieldErrors = Partial<Record<ValidatedField, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Acepta un "+" opcional al inicio y entre 7 y 15 dígitos (sin contar espacios ni guiones)
const PHONE_REGEX = /^\+?\d{7,15}$/;
// Letras (con tildes y ñ), espacios, apóstrofes, puntos y guiones
const PERSON_NAME_REGEX = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'.-]+$/;

const validateUser = (info: UserInfo): FieldErrors => {
  const errors: FieldErrors = {};

  if (!info.idRole) {
    errors.idRole = "Selecciona un rol";
  }

  // "?? ''" evita errores si el backend devuelve algún campo en null
  const name = (info.nameUser ?? "").trim();
  if (!name) {
    errors.nameUser = "Ingresa el nombre del usuario";
  } else if (name.length < 2) {
    errors.nameUser = "El nombre debe tener al menos 2 caracteres";
  } else if (name.length > 100) {
    errors.nameUser = "El nombre no puede superar los 100 caracteres";
  } else if (!PERSON_NAME_REGEX.test(name)) {
    errors.nameUser = "El nombre solo puede contener letras y espacios";
  }

  const lastName = (info.lastNameUser ?? "").trim();
  if (!lastName) {
    errors.lastNameUser = "Ingresa los apellidos del usuario";
  } else if (lastName.length < 2) {
    errors.lastNameUser = "Los apellidos deben tener al menos 2 caracteres";
  } else if (lastName.length > 100) {
    errors.lastNameUser = "Los apellidos no pueden superar los 100 caracteres";
  } else if (!PERSON_NAME_REGEX.test(lastName)) {
    errors.lastNameUser =
      "Los apellidos solo pueden contener letras y espacios";
  }

  const email = (info.emailUser ?? "").trim();
  if (!email) {
    errors.emailUser = "Ingresa el email del usuario";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.emailUser = "Ingresa un email válido, por ejemplo nombre@correo.com";
  } else if (email.length > 100) {
    errors.emailUser = "El email no puede superar los 100 caracteres";
  }

  const phone = (info.phoneUser ?? "").replace(/[\s-]/g, "");
  if (!phone) {
    errors.phoneUser = "Ingresa el celular o teléfono del usuario";
  } else if (!PHONE_REGEX.test(phone)) {
    errors.phoneUser = "Usa solo números, entre 7 y 15 dígitos";
  }

  return errors;
};

function UserButtonModal({ text, action, idUser }: IUserForm) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form] = Form.useForm();

  const {
    createNewUser,
    getOneUser,
    updateOneUser,
    deleteOneUser,
    currentUser,
    clearDataCurrentUser,
    addInfoWatchAction,
  } = useUsers();

  const { getAllRoles, resetDataRole } = useRoles();

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  // Solo mostramos el error de un campo después de que el usuario lo tocó
  const [touched, setTouched] = useState<
    Partial<Record<ValidatedField, boolean>>
  >({});

  const errors = useMemo(() => validateUser(userInfo), [userInfo]);
  const isFormValid = Object.keys(errors).length === 0;
  const requiresValidation = action !== "delete";

  const resetUserInfo = () => {
    setUserInfo(initialUserInfo);
    setTouched({});

    form.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);

    if (action !== "delete") {
      getAllRoles();
    }

    if (action === "create") {
      resetUserInfo();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetDataRole();
    clearDataCurrentUser();
    resetUserInfo();
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
        idRole: true,
        nameUser: true,
        lastNameUser: true,
        emailUser: true,
        phoneUser: true,
      });
      return;
    }

    // Enviamos los datos sin espacios sobrantes
    const cleanUserInfo: UserInfo = {
      ...userInfo,
      nameUser: (userInfo.nameUser ?? "").trim(),
      lastNameUser: (userInfo.lastNameUser ?? "").trim(),
      emailUser: (userInfo.emailUser ?? "").trim(),
      phoneUser: (userInfo.phoneUser ?? "").trim(),
    };

    setIsSubmitting(true);
    try {
      if (action === "create") {
        await createNewUser(cleanUserInfo);
        message.success("Usuario creado correctamente");
        addInfoWatchAction(action);
        resetDataRole();
        setIsModalOpen(false);
        resetUserInfo();
        return;
      }

      if (action === "update" && idUser) {
        await updateOneUser({
          ...cleanUserInfo,
          idUser,
        });

        message.success("Usuario actualizado correctamente");
        addInfoWatchAction(action);
        resetDataRole();
        return;
      }

      if (action === "delete" && idUser) {
        await deleteOneUser(idUser);
        message.success("Usuario eliminado correctamente");
        addInfoWatchAction(action);
        resetDataRole();
        setIsModalOpen(false);
        resetUserInfo();
        return;
      }
    } catch {
      message.error("No se pudo realizar la operación");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = (value: number) => {
    setUserInfo((prev) => ({
      ...prev,
      idRole: value,
    }));
    handleBlur("idRole");
  };

  const handleStateChange = (checked: boolean) => {
    setUserInfo((prev) => ({
      ...prev,
      stateUser: checked,
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action !== "update") return;
    if (!idUser) return;

    getOneUser(idUser);
  }, [isModalOpen, action, idUser]);

  useEffect(() => {
    if (!isModalOpen) return;
    if (action !== "update") return;
    if (!currentUser) return;

    setUserInfo(currentUser);
  }, [currentUser]);

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
            ? "Eliminar usuario"
            : action === "create"
              ? "Crear usuario"
              : "Editar usuario"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "delete" && <DeleteOutlined />}
          {action === "create" && <UserAddOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} usuario`}
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
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          {action !== "delete" && (
            <>
              <Form.Item label="Rol" required {...getFieldStatus("idRole")}>
                <div onBlur={() => handleBlur("idRole")}>
                  <RoleSelect
                    value={userInfo.idRole}
                    onChange={handleRoleChange}
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Nombres"
                required
                {...getFieldStatus("nameUser")}
              >
                <Input
                  name="nameUser"
                  value={userInfo.nameUser}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("nameUser")}
                  maxLength={100}
                />
              </Form.Item>

              <Form.Item
                label="Apellidos"
                required
                {...getFieldStatus("lastNameUser")}
              >
                <Input
                  name="lastNameUser"
                  value={userInfo.lastNameUser}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("lastNameUser")}
                  maxLength={100}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                required
                {...getFieldStatus("emailUser")}
              >
                <Input
                  name="emailUser"
                  value={userInfo.emailUser}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("emailUser")}
                  inputMode="email"
                  maxLength={100}
                />
              </Form.Item>

              <Form.Item
                label="Celular / Telefono"
                required
                {...getFieldStatus("phoneUser")}
              >
                <Input
                  name="phoneUser"
                  value={userInfo.phoneUser}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("phoneUser")}
                  inputMode="tel"
                  maxLength={20}
                />
              </Form.Item>

              {action === "update" && (
                <Form.Item label="Estado">
                  <Switch
                    checked={userInfo.stateUser}
                    onChange={handleStateChange}
                  />
                </Form.Item>
              )}
            </>
          )}

          {action === "delete" && (
            <h1>¿Está seguro que desea eliminar a este usuario?</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default UserButtonModal;
