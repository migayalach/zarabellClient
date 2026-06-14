import React, { useState } from "react";
import type { FormProps } from "antd";
import { Modal, Form, Input } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useUsers } from "@/app/features/users/hooks/useUsers";

type FieldType = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

function AuthChangePassword() {
  // const { changeUserPassword } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // changeUserPassword({
    //   currentPassword: values.currentPassword!,
    //   newPassword: values.newPassword!,
    // });
  };

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => setIsModalOpen(false);

  const handleOk = () => form.submit();

  return (
    <>
      <button onClick={showModal} className="flex items-center gap-2">
        <SettingOutlined />
        <span>Cambiar contraseña</span>
      </button>

      <Modal
        title="Actualizar contraseña"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Actualizar"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* <Form.Item
            label="Contraseña actual"
            name="currentPassword"
            rules={[
              { required: true, message: "Ingresa tu contraseña actual" },
              { min: 5, message: "Mínimo 5 caracteres!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nueva contraseña"
            name="newPassword"
            dependencies={["currentPassword"]}
            rules={[
              { required: true, message: "Ingresa la nueva contraseña" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const current = getFieldValue("currentPassword");

                  if (!value) return Promise.resolve();

                  if (value === current) {
                    return Promise.reject(
                      new Error(
                        "La nueva contraseña no puede ser igual a la anterior",
                      ),
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirmar contraseña"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Confirma tu nueva contraseña" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las contraseñas no coinciden"),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item> */}
          <h1>CAMBIAR CONTRASEÑA</h1>
        </Form>
      </Modal>
    </>
  );
}

export default AuthChangePassword;
