import React, { useState } from "react";
import type { FormProps } from "antd";
import { Modal, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { useUser } from "../hooks/useUser";

type FieldType = {
  fullNameUser: string;
  nitUser: string;
  numberPhoneUser: string;
  codeUser: string;
  emailUser: string;
  numberSucursal: string;
  locality: string;
  numberLocality: string;
  city: string;
};

function AuthFormInformation() {
  // const { info, updateInfoUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);

    // if (info) {
    //   form.setFieldsValue({
    //     fullNameUser: info.fullNameUser,
    //     nitUser: info.nitUser,
    //     numberPhoneUser: info.numberPhoneUser,
    //     codeUser: info.codeUser,
    //     emailUser: info.emailUser,
    //     numberSucursal: info.numberSucursal,
    //     locality: info.locality,
    //     numberLocality: info.numberLocality,
    //     city: info.city,
    //   });
    // }
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // updateInfoUser(values);
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
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <h1>VER INFORMACION XD</h1>
          {/* <Form.Item
            label="Email"
            name="emailUser"
            rules={[{ required: true, message: "Ingrese su email" }]}
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="Nombre completo"
            name="fullNameUser"
            rules={[{ required: true, message: "Ingrese su nombre" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="NIT"
            name="nitUser"
            rules={[{ required: true, message: "Ingrese su NIT" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Celular"
            name="numberPhoneUser"
            rules={[{ required: true, message: "Ingrese su celular" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Código de usuario"
            name="codeUser"
            rules={[{ required: true, message: "Ingrese su código" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Numero de sucursal"
            name="numberSucursal"
            rules={[{ required: true, message: "Ingrese nro de sucursal" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Localidad"
            name="locality"
            rules={[{ required: true, message: "Ingrese localidad" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Numero de localidad"
            name="numberLocality"
            rules={[
              { required: true, message: "Ingrese el numero de localidad" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ciudad"
            name="city"
            rules={[
              { required: true, message: "Ingrese el nombre de la ciudad" },
            ]}
          >
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
}

export default AuthFormInformation;
