export interface IOutput {
  idOutput: number;
  idUser: number;
  idTypeOutput: number;
  idBranch: number;
  nameTypeOutput: string;
  nameUser: string;
  nameBranch: string;
  dateOutput: string;
  codeOutput: string;
}

export interface IOutputCreate {
  idUser: number;
  idTypeOutput: number;
  idBranch: number;
  dateOutput: string;
}

export interface IOutputUpdate {
  idOutput: number;
  idUser: number;
  idTypeOutput: number;
  idBranch: number;
  dateOutput: string;
}

export interface IPaginationOutput {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorOutput {
  message: string;
}

export interface IResponseOutputs {
  message: string;
  info: IPaginationOutput;
  results: IOutput[];
}

export interface IResponseOutput {
  success: boolean;
  message: string;
  value: IOutput;
}
