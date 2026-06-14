"use client";

import React, { useState } from "react";
import { Layout, Dropdown, Button, Drawer } from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  LogoutOutlined,
  AuditOutlined,
} from "@ant-design/icons";
// import UChangePassword from "@/app/features/user/components/UChangePassword";
// import USeeInformation from "@/app/features/user/components/USeeInformation";
import { useRouter } from "next/navigation";

const { Header } = Layout;

function NavBarMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const userMenu = {
    items: [
      {
        key: "profile",
        // icon: <USeeInformation />,
      },
      {
        key: "password",
        // icon: <UChangePassword />,
      },
      {
        key: "logout",
        label: "Salir",
        icon: <LogoutOutlined />,
      },
    ],
  };

  const desktopMenu = (
    <div className="hidden md:flex items-center w-full justify-between">
      {/* IZQUIERDA */}
      <div className="flex items-center gap-2 text-white">
        <HomeOutlined onClick={() => router.push("/home")} />
      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-6 text-white">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => router.push("/sales")}
        >
          <ShoppingCartOutlined />
          <span>Ventas</span>
        </div>

        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => router.push("/clients")}
        >
          <AuditOutlined />
          <span>Clientes</span>
        </div>

        <Dropdown menu={userMenu} placement="bottomRight">
          <div className="flex items-center gap-1 cursor-pointer">
            <UserOutlined />
            <span>Usuario</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );

  const mobileMenu = (
    <div className="flex md:hidden items-center justify-between w-full text-white">
      {/* HOME */}
      <div
        className="flex items-center gap-2"
        onClick={() => router.push("/home")}
      >
        <HomeOutlined />
      </div>

      {/* BOTÓN MENU */}
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setOpen(true)}
        style={{ color: "white" }}
      />

      {/* DRAWER */}
      <Drawer
        title="Menú"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        size={220}
      >
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center gap-2"
            onClick={() => router.push("/sales")}
          >
            <ShoppingCartOutlined />
            Ventas
          </div>

          <div
            className="flex items-center gap-2"
            onClick={() => router.push("/clients")}
          >
            <AuditOutlined />
            Clientes
          </div>

          <div className="flex items-center gap-2">
            {/* <USeeInformation /> */}
          </div>

          <div className="flex items-center gap-2">
            {/* <UChangePassword /> */}
          </div>
          <div className="flex items-center gap-2">
            <LogoutOutlined />
            Salir
          </div>
        </div>
      </Drawer>
    </div>
  );

  return (
    <Header className="flex items-center bg-[#001529] px-4">
      {desktopMenu}
      {mobileMenu}
    </Header>
  );
}

export default NavBarMenu;
