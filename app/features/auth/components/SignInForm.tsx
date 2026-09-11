"use client";

import React, { useEffect, useRef, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { useSignIn } from "../hooks/useSignIn";

type FieldType = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const { signIn, loading, error } = useSignIn();
  const prevError = useRef<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error && error !== prevError.current) {
      const messages: Record<string, string> = {
        "Invalid credentials": "Contraseña incorrecta",
        "User does not exist or email does not register":
          "No se encontró el usuario",
        "Account disabled": "La cuenta está deshabilitada",
      };
      message.error(messages[error] || error);
    }
  }, [error]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await signIn(values);
      message.success("Inicio de sesión exitoso");
    } catch {}
  };

  return (
    <Form name="login-form" onFinish={onFinish} autoComplete="off">
      <Form.Item<FieldType>
        name="email"
        rules={[
          {
            required: true,
            message: "Por favor introduce tu correo!",
          },
          {
            type: "email",
            message: "Ingresa un correo electrónico válido!",
          },
        ]}
      >
        <Input
          placeholder="zarabell@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[
          {
            required: true,
            message: "Por favor introduce tu contraseña!",
          },
          {
            min: 8,
            message: "La contraseña debe tener mínimo 8 caracteres!",
          },
          {
            pattern: /[A-Z]/,
            message: "Debe contener al menos una mayúscula!",
          },
          {
            pattern: /[a-z]/,
            message: "Debe contener al menos una minúscula!",
          },
          {
            pattern: /[0-9]/,
            message: "Debe contener al menos un número!",
          },
          {
            pattern: /[^A-Za-z0-9]/,
            message: "Debe contener al menos un carácter especial!",
          },
        ]}
      >
        <Input.Password
          placeholder="3b{HyzQR"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
