import React from "react";
import { Button } from "antd";
import Link from "next/link";
import { FolderViewOutlined } from "@ant-design/icons";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

function InputRecordBtnAction({
  idInventoryEntry,
}: {
  idInventoryEntry: number;
}) {
  const canSee = useHasPermission([1, 2]);

  if (!canSee) {
    return null;
  }

  return (
    <CustomTooltip text="Ver más">
      <Link href={`/inventory-entries/${idInventoryEntry}`}>
        <Button color="primary" variant="solid">
          <FolderViewOutlined />
        </Button>
      </Link>
    </CustomTooltip>
  );
}

export default InputRecordBtnAction;
