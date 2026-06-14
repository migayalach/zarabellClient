"use client";

import { useState } from "react";
import { Layout, Dropdown, Button, Drawer } from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  LogoutOutlined,
  AuditOutlined,
  ReadOutlined,
  UserSwitchOutlined,
  OrderedListOutlined,
  ProductOutlined,
  BookOutlined,
  ContactsOutlined,
  ProfileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  AuthChangePassword,
  AuthFormInformation,
} from "@/app/features/auth/components";

const { Header } = Layout;

function NavBarMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const mobileItems = [
    { key: "sales", label: "Ventas", icon: <ShoppingCartOutlined /> },
    { key: "clients", label: "Clientes", icon: <AuditOutlined /> },
    { key: "roles", label: "Roles", icon: <OrderedListOutlined /> },
    { key: "users", label: "Usuarios", icon: <UserSwitchOutlined /> },
    { key: "providers", label: "Proveedores", icon: <ContactsOutlined /> },
    { key: "categories", label: "Categorias", icon: <BookOutlined /> },
    { key: "products", label: "Productos", icon: <ProductOutlined /> },
    { key: "reasons", label: "Razones", icon: <ProfileOutlined /> },
    { key: "typeOutputs", label: "Tipo salidas", icon: <SolutionOutlined /> },
  ];

  const handleMenuClick = (key: string) => {
    router.push(`/${key}`);
  };

  const infoMenu = {
    items: [
      {
        key: "profile",
        icon: <AuthFormInformation />,
      },
      {
        key: "password",
        icon: <AuthChangePassword />,
      },
      {
        key: "logout",
        label: "Salir",
        icon: <LogoutOutlined />,
      },
    ],
  };

  const userMenu = {
    onClick: ({ key }: { key: string }) => handleMenuClick(key),
    items: [
      {
        key: "roles",
        icon: <OrderedListOutlined />,
        label: "Roles",
      },
      {
        key: "users",
        icon: <UserSwitchOutlined />,
        label: "Usuarios",
      },
    ],
  };

  const productMenu = {
    onClick: ({ key }: { key: string }) => handleMenuClick(key),
    items: [
      {
        key: "providers",
        icon: <ContactsOutlined />,
        label: "Proveedores",
      },
      {
        key: "categories",
        icon: <BookOutlined />,
        label: "Categorias",
      },
      {
        key: "products",
        icon: <OrderedListOutlined />,
        label: "Productos",
      },
    ],
  };

  const optionsMenu = {
    onClick: ({ key }: { key: string }) => handleMenuClick(key),
    items: [
      {
        key: "reasons",
        icon: <ProfileOutlined />,
        label: "Tipo razones",
      },
      {
        key: "typeOutputs",
        icon: <SolutionOutlined />,
        label: "Tipo salidas",
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
        <Dropdown menu={optionsMenu} placement="bottomRight">
          <div className="flex items-center gap-1 cursor-pointer">
            <UserOutlined />
            <span>Herramientas</span>
          </div>
        </Dropdown>

        <Dropdown menu={productMenu} placement="bottomRight">
          <div className="flex items-center gap-1 cursor-pointer">
            <ProductOutlined />
            <span>Productos</span>
          </div>
        </Dropdown>

        <Dropdown menu={userMenu} placement="bottomRight">
          <div className="flex items-center gap-1 cursor-pointer">
            <ReadOutlined />
            <span>Usuarios</span>
          </div>
        </Dropdown>

        <Dropdown menu={infoMenu} placement="bottomRight">
          <div className="flex items-center gap-1 cursor-pointer">
            <UserOutlined />
            <span>Pepito</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );

  const mobileMenu = (
    <div className="flex md:hidden items-center justify-between w-full text-white">
      {/* HOME */}
      <div
        className="flex items-center gap-2 cursor-pointer"
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
        size={260}
      >
        <div className="flex flex-col gap-4">
          <AuthFormInformation />
          <AuthChangePassword />
          {mobileItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setOpen(false);
                router.push(`/${item.key}`);
              }}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
          <div className="flex items-center gap-2 cursor-pointer">
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
