"use client";

import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { useForgotPassword } from "../hooks/useForgotPassword";

const AuthForgotPassword: React.FC = () => {
  const { forgotPassword } = useForgotPassword();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const messages: Record<string, string> = {
    "If the email is registered, a recovery link has been sent.":
      "Si el correo está registrado, se ha enviado un enlace de recuperación.",
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const result = await forgotPassword(email);

      const translatedMessage = messages[result.message] || result.message;

      if (result.success) {
        message.success(translatedMessage);
      } else {
        message.error(translatedMessage);
      }
      
    } catch (error) {
      const backendMessage =
        error instanceof Error
          ? error.message
          : "Error al solicitar recuperación";

      message.error(messages[backendMessage] || backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center text-[20px] mb-3">Recuperar contraseña</h1>

      <p className="text-[12px] text-center mb-4">
        Ingresa tu correo para recibir un enlace de recuperación
      </p>

      <Input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3"
      />

      <Button
        type="primary"
        block
        loading={loading}
        onClick={handleSubmit}
        className="mt-4"
      >
        Enviar enlace
      </Button>
    </div>
  );
};

export default AuthForgotPassword;
