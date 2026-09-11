"use client";

import { useState } from "react";
import Image from "next/image";
import { SignInForm } from "../features/auth/components";
import AuthForgotPassword from "../features/auth/components/AuthForgotPassword";

function Page() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="bg-amber-300 flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-[320px]">
        <h1 className="mb-3 text-center text-[20px]">
          {showForgotPassword
            ? "Recuperar contraseña"
            : "Iniciar Sesión"}
        </h1>

        <Image
          src="https://res.cloudinary.com/dqgcyonb9/image/upload/v1789115958/Zarabell/fuuyo2zxmn8qv92clo1a.png"
          alt="Logo"
          width={300}
          height={300}
          className="mx-auto mb-3 object-contain"
        />

        {!showForgotPassword ? (
          <>
            <p className="text-[12px] text-center mb-4">
              Inicia sesión para acceder a tu historial
            </p>

            <SignInForm />

            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="w-full mt-4 text-sm text-blue-600"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </>
        ) : (
          <>
            <AuthForgotPassword />

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="w-full mt-4 text-sm text-blue-600"
            >
              Volver a iniciar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;