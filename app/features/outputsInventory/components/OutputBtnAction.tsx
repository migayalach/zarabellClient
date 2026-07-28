import React from "react";
import { Button } from "antd";
import Link from "next/link";
import { FolderViewOutlined } from "@ant-design/icons";

function OutputBtnAction({ idOutput }: { idOutput: number }) {
  return (
    <Link href={`/inventory-outputs/${idOutput}`}>
      <Button color="primary" variant="solid">
        <FolderViewOutlined />
      </Button>
    </Link>
  );
}

export default OutputBtnAction;
