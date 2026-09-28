"use client";

import { useState } from "react";
import Image from "next/image";
import { ConfigProvider } from "antd";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { SignInForm } from "../features/auth/components";
import AuthForgotPassword from "../features/auth/components/AuthForgotPassword";

// Títulos con una serif suave + texto de lectura redondeado
const display = Fraunces({ subsets: ["latin"], display: "swap" });
const body = Nunito_Sans({ subsets: ["latin"], display: "swap" });

// Colores de la marca: cámbialos aquí y se actualiza toda la página
const WINE = "#8A2D4B"; // botón, enlaces y logo
const BLUSH = "#F7DFDC"; // fondo de la página
const BLUSH_DEEP = "#F1C9C5"; // círculos decorativos
const BORDER = "#EBCFCB"; // borde de los campos
const FIELD_BG = "#FFFBFA"; // fondo de los campos
const INK = "#3A2325"; // texto principal
const MUTED = "#755D60"; // texto secundario

function Page() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const linkButtonClass =
    "mt-4 w-full rounded-full text-center text-[13px] font-semibold text-[#8A2D4B] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A2D4B]";

  return (
    <main
      className={`${body.className} relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10`}
      style={{ backgroundColor: BLUSH, color: INK }}
    >
      {/* Formas redondas de fondo, como una polvera */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-24 h-[340px] w-[340px] rounded-full"
        style={{ backgroundColor: BLUSH_DEEP }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-[220px] w-[220px] rounded-full"
        style={{ backgroundColor: BLUSH_DEEP }}
      />

      <div className="relative z-10 w-full max-w-[360px] rounded-3xl bg-white px-8 py-9 shadow-[0_24px_48px_-26px_rgba(138,45,75,0.4)]">
        <Image
          src="https://res.cloudinary.com/dqgcyonb9/image/upload/v1789115958/Zarabell/fuuyo2zxmn8qv92clo1a.png"
          alt="Zarabell"
          width={500}
          height={500}
          priority
          className="mx-auto mb-5 h-35 w-auto object-contain"
        />

        <h1
          className={`${display.className} text-center text-[1.375rem] font-medium leading-tight`}
        >
          {showForgotPassword ? "Recuperar contraseña" : "Iniciar sesión"}
        </h1>

        {!showForgotPassword ? (
          <p
            className="mb-6 mt-1.5 text-center text-[13px]"
            style={{ color: MUTED }}
          >
            Inicia sesión para acceder
          </p>
        ) : (
          <div className="mb-6" />
        )}

        {/* Los campos y botones de antd toman el color y las esquinas de la marca */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: WINE,
              colorLink: WINE,
              colorBorder: BORDER,
              colorBgContainer: FIELD_BG,
              borderRadius: 14,
              controlHeight: 44,
              fontFamily: "inherit",
            },
            components: {
              Button: {
                borderRadius: 999,
                borderRadiusLG: 999,
                borderRadiusSM: 999,
                controlHeight: 46,
              },
            },
          }}
        >
          {!showForgotPassword ? (
            <>
              <SignInForm />

              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className={linkButtonClass}
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
                className={linkButtonClass}
              >
                Volver a iniciar sesión
              </button>
            </>
          )}
        </ConfigProvider>
      </div>
    </main>
  );
}

export default Page;
