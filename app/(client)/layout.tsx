"use client";

import { Layout } from "antd";
import { useRequireAuth } from "@/app/features/auth/hooks/useRequireAuth";
import NavBarMenu from "../shared/components/SCNavBar";

const { Content, Footer } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
