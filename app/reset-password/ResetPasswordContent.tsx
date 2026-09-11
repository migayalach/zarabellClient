"use client";

import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import { useForgotPassword } from "../features/auth/hooks/useForgotPassword";

type PasswordStrength = "vacia" | "baja" | "media" | "alta";

const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return "vacia";

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "baja";
  if (score <= 4) return "media";
  return "alta";
};

const strengthConfig: Record<
  PasswordStrength,
  { label: string; color: string; width: string }
> = {
  vacia: { label: "", color: "bg-gray-200", width: "w-0" },
  baja: { label: "Baja", color: "bg-red-500", width: "w-1/3" },
  media: { label: "Media", color: "bg-yellow-500", width: "w-2/3" },
  alta: { label: "Alta", color: "bg-green-500", width: "w-full" },
};

export default function ResetPasswordContent() {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { resetPassword } = useForgotPassword();

  const strength = getPasswordStrength(password);
  const { label, color, width } = strengthConfig[strength];

  const handleSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (!token) {
      message.error("Token inválido o expirado");
      router.push("/auth");
      return;
    }

    try {
      const result = await resetPassword(token, values.password);

      if (result.success) {
        message.success(result.message);
        form.resetFields();
        setPassword("");

        setTimeout(() => {
          router.push("/auth");
        }, 1200);
      } else {
        message.error(result.message);

        setTimeout(() => {
          router.push("/auth");
        }, 1500);
      }
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "No se pudo restablecer la contraseña",
      );

      setTimeout(() => {
        router.push("/auth");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-amber-300 flex items-center justify-center px-4">
      <div className="w-full max-w-95 bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-7">
          <h1 className="text-2xl font-semibold text-gray-800">
            Restablecer contraseña
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Crea una nueva contraseña para tu cuenta
          </p>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nueva contraseña"
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
              size="large"
              placeholder="Nueva contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Confirmar contraseña"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Confirma tu contraseña",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Las contraseñas no coinciden"),
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Confirmar contraseña" />
          </Form.Item>

          {password && (
            <div className="mb-5 -mt-3">
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${color} ${width}`}
                />
              </div>

              <p
                className={`text-xs mt-1 font-medium ${
                  strength === "baja"
                    ? "text-red-500"
                    : strength === "media"
                      ? "text-yellow-600"
                      : "text-green-600"
                }`}
              >
                Seguridad: {label}
              </p>
            </div>
          )}

          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" size="large" block>
              Restablecer contraseña
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
