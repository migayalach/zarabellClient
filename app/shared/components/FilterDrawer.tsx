"use client";

import { useState, type ReactNode } from "react";
import { Drawer, FloatButton } from "antd";
import { FilterOutlined } from "@ant-design/icons";

type FilterDrawerProps = {
  title?: string;
  children: ReactNode;
};

function FilterDrawer({ title = "Filtros", children }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatButton
        icon={<FilterOutlined />}
        tooltip={title}
        onClick={() => setOpen(true)}
      />

      <Drawer
        title={title}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        size={400}
      >
        {children}
      </Drawer>
    </>
  );
}

export default FilterDrawer;
