"use client";

import { useState } from "react";
import { Layout, Dropdown, Button, Drawer, MenuProps } from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  AuditOutlined,
  ReadOutlined,
  UserSwitchOutlined,
  OrderedListOutlined,
  ProductOutlined,
  BookOutlined,
  ContactsOutlined,
  ProfileOutlined,
  SolutionOutlined,
  HistoryOutlined,
  FormOutlined,
  FileSearchOutlined,
  SnippetsFilled,
  FileMarkdownOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  AuthChangePassword,
  AuthFormInformation,
} from "@/app/features/auth/components";
import { useAuth } from "@/app/features/auth/hooks/useAuth";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";
import AuthSignOut from "@/app/features/auth/components/AuthSignOut";

const { Header } = Layout;

function NavBarMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const canManageHistory = useHasPermission([1, 2]);
  const canManageUsers = useHasPermission([1]);
  const canManageProducts = useHasPermission([1, 2]);
  const canManageTools = useHasPermission([1, 2]);
  const canViewProviders = useHasPermission([1, 2]);
  const canViewProducts = useHasPermission([1, 2]);

  const mobileItems = [
    {
      key: "inventory-entries",
      label: "Ingresos",
      icon: <ShoppingCartOutlined />,
      allowed: canManageHistory,
    },
    {
      key: "inventory-outputs",
      label: "Salidas",
      icon: <AuditOutlined />,
      allowed: canManageHistory,
    },
    {
      key: "sales",
      label: "Ventas",
      icon: <OrderedListOutlined />,
      allowed: canManageHistory,
    },
    {
      key: "clients",
      label: "Clientes",
      icon: <ContactsOutlined />,
      allowed: canManageHistory,
    },
    {
      key: "roles",
      label: "Roles",
      icon: <UserOutlined />,
      allowed: canManageUsers,
    },
    {
      key: "users",
      label: "Usuarios",
      icon: <UserOutlined />,
      allowed: canManageUsers,
    },

    // PRODUCTOS
    {
      key: "providers",
      label: "Proveedores",
      icon: <BookOutlined />,
      allowed: canViewProviders,
    },
    {
      key: "branchs",
      label: "Sucursales",
      icon: <ProfileOutlined />,
      allowed: true,
    },
    {
      key: "categories",
      label: "Categorias",
      icon: <OrderedListOutlined />,
      allowed: true,
    },
    {
      key: "products",
      label: "Productos",
      icon: <ProductOutlined />,
      allowed: canViewProducts,
    },
    {
      key: "magazine",
      label: "Magazine",
      icon: <FileMarkdownOutlined />,
      allowed: true,
    },

    // HERRAMIENTAS
    {
      key: "reasons",
      label: "Razones",
      icon: <FileSearchOutlined />,
      allowed: true,
    },
    {
      key: "typeOutputs",
      label: "Tipo salidas",
      icon: <SnippetsFilled />,
      allowed: true,
    },
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
        icon: <AuthSignOut />,
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

  const productMenu: MenuProps = {
    onClick: ({ key }) => handleMenuClick(key),
    items: [
      canViewProviders && {
        key: "providers",
        icon: <ContactsOutlined />,
        label: "Proveedores",
      },
      {
        key: "branchs",
        icon: <SnippetsFilled />,
        label: "Sucursales",
      },
      {
        key: "categories",
        icon: <BookOutlined />,
        label: "Categorias",
      },
      canViewProducts && {
        key: "products",
        icon: <OrderedListOutlined />,
        label: "Productos",
      },
      {
        key: "magazine",
        icon: <FileMarkdownOutlined />,
        label: "Magazine",
      },
    ].filter(Boolean) as NonNullable<MenuProps["items"]>,
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

  const optionsHistory = {
    onClick: ({ key }: { key: string }) => handleMenuClick(key),
    items: [
      {
        key: "inventory-entries",
        icon: <FormOutlined />,
        label: "Nuevo ingreso",
      },
      {
        key: "inventory-outputs",
        icon: <ProfileOutlined />,
        label: "Nueva Salida",
      },
    ],
  };

  const desktopMenu = (
    <div className="hidden md:flex items-center w-full justify-between">
      <div className="flex items-center gap-2 text-white">
        <HomeOutlined onClick={() => router.push("/home")} />
      </div>

      <div className="flex items-center gap-6 text-white">
        {canManageHistory && (
          <Dropdown menu={optionsHistory} placement="bottomRight">
            <div className="flex items-center gap-1 cursor-pointer">
              <HistoryOutlined />
              <span>Historial</span>
            </div>
          </Dropdown>
        )}

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

        {canManageUsers && (
          <Dropdown menu={userMenu} placement="bottomRight">
            <div className="flex items-center gap-1 cursor-pointer">
              <ReadOutlined />
              <span>Usuarios</span>
            </div>
          </Dropdown>
        )}

        <Dropdown menu={infoMenu} placement="bottomRight">
          <div className="flex items-center gap-1 cursor-pointer">
            <UserOutlined />
            <span>{user?.nameUser?.split(" ")[0]}</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );

  const mobileMenu = (
    <div className="flex md:hidden items-center justify-between w-full text-white">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/home")}
      >
        <HomeOutlined />
      </div>

      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setOpen(true)}
        style={{ color: "white" }}
      />

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

          {mobileItems
            .filter((item) => item.allowed)
            .map((item) => (
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
            <AuthSignOut />
          </div>
        </div>
      </Drawer>
    </div>
  );

  return (
    <Header
      className="flex items-center bg-[#001529] px-4"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      {desktopMenu}
      {mobileMenu}
    </Header>
  );
}

export default NavBarMenu;