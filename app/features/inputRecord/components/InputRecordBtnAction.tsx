import React from "react";
import { Button } from "antd";
import Link from "next/link";
import { FolderViewOutlined } from "@ant-design/icons";

function InputRecordBtnAction({
  idInventoryEntry,
}: {
  idInventoryEntry: number;
}) {
  return (
    <Link href={`/inventory-entries/${idInventoryEntry}`}>
      <Button color="primary" variant="solid">
        <FolderViewOutlined />
      </Button>
    </Link>
  );
}

export default InputRecordBtnAction;
