"use client";

import { Layout } from "antd";
import NavBarMenu from "../shared/components/SCNavBar";
import { useRequireAuth } from "@/app/features/auth/hooks/useRequireAuth";
import { useRestoreSession } from "../features/auth/hooks/useRestoreSession";

const { Content, Footer } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRestoreSession();
  useRequireAuth();

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBarMenu />
      <Content
        style={{
          padding: "24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ZaraBell © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
