"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useSignIn } from "../hooks/useSignIn";

type FieldType = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const { signIn, loading } = useSignIn();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {   
    signIn(values);
  };

  return (
    <Form name="login-form" onFinish={onFinish} autoComplete="off">
      <Form.Item<FieldType>
        name="email"
        rules={[
          { required: true, message: "Por favor introduce tu usuario!" },
          { min: 5, message: "Ingresa un nombre de usuario valido!" },
        ]}
      >
        <Input placeholder="Nombre de usuario" />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[
          { required: true, message: "Por favor introduce tu contraseña!" },
          { min: 5, message: "Mínimo 5 caracteres!" },
        ]}
      >
        <Input.Password placeholder="Contraseña" />
      </Form.Item>

      <Form.Item>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignInForm;
