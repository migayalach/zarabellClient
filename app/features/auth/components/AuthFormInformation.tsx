import { useState } from "react";
import type { FormProps } from "antd";
import { Modal, Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

type FieldType = {
  nameUser: string;
  lastNameUser: string;
  emailUser: string;
  phoneUser: string;
};

function AuthFormInformation() {
  const { updateProfile } = useProfile();
  const { user, initialized } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
    if (initialized && user) {
      form.setFieldsValue({
        nameUser: user.nameUser,
        lastNameUser: user.lastNameUser,
        emailUser: user.emailUser,
        phoneUser: user.phoneUser,
      });
    }
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await updateProfile(values);
      message.success("Perfil actualizado");
    } catch (error) {
      message.error("Error al actualizar perfil");
    }
  };

  return (
    <>
      <button onClick={showModal} className="flex items-center gap-2">
        <UserOutlined />
        <span>Ver información</span>
      </button>

      <Modal
        title="Mi perfil"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Actualizar"
        width={500}
      >
        <Form
          form={form}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 400 }}
        >
          <Form.Item label="Rol">
            <Input
              disabled
              value={
                user?.nameRole === "Admin" ? "Administrador" : user?.nameRole
              }
            />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="nameUser"
            rules={[{ required: true, message: "Ingrese su nombre" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="lastNameUser"
            rules={[{ required: true, message: "Ingrese su apellido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="emailUser"
            rules={[{ required: true, message: "Ingrese su email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Número de celular"
            name="phoneUser"
            rules={[
              { required: true, message: "Ingrese su celular / Telefono" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AuthFormInformation;
