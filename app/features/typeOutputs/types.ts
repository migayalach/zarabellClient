export interface ITypeOutput {
  idTypeOutput: number;
  nameTypeOutput: string;
  descriptionTypeOutput: string;
}

export type ITypeOutputCreate = Omit<ITypeOutput, "idTypeOutput">;

export type ITypeOutputUpdate = ITypeOutput;

export interface IPaginationTypeOutput {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorTypeOutput {
  success: false;
  message: string;
}

export interface IApiResponseTypeOutput<T> {
  success: boolean;
  message: string;
  results: T;
}

export interface IResponseTypeOutputs {
  success: boolean;
  message: string;
  info: IPaginationTypeOutput;
  results: ITypeOutput[];
}

export interface IResponseTypeOutput {
  success: boolean;
  message: string;
  value: ITypeOutput;
}
