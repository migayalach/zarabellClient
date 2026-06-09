"use client";
import React from "react";
import SignInForm from "../features/auth/components/SignInForm";

function Page() {
  return (
    <div className="bg-amber-300 flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-[320px]">
        <>
          <h1 className="mb-3 text-center text-[20px]">Iniciar Sesión</h1>
          <p className="text-[12px] text-center mb-4">
            Inicia sesión para acceder a tu historial
          </p>
          <SignInForm />
        </>
      </div>
    </div>
  );
}

export default Page;
