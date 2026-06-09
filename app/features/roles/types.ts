export interface RoleInfo {
  idRole: number;
  nameRole: string;
}

export interface InfoData {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface PaginateResponse {
  info: InfoData;
  results: RoleInfo[];
}
