"use client";

import { Flex, Spin, Typography } from "antd";
const { Text } = Typography;

export default function Loading() {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ minHeight: "100vh" }}
    >
      <Spin size="large" />
      <Text type="secondary" style={{ marginTop: 12, fontSize: 16 }}>
        Cargando...
      </Text>
    </Flex>
  );
}
