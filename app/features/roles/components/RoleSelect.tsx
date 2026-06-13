"use client";
import { Select } from "antd";
import { useRoles } from "../hooks/useRoles";
import { IRole } from "../types";

function RoleSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const { results } = useRoles();

  return (
    <Select
      value={value === 0 ? 1 : value}
      placeholder="Seleccionar un rol"
      style={{ width: 200 }}
      onChange={(value) => onChange(value)}
      options={results.map((role: IRole) => ({
        value: role.idRole,
        label: role.nameRole,
      }))}
      allowClear
      showSearch
    />
  );
}

export default RoleSelect;
