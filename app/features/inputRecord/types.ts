export interface IRecordInput {
  idInputRecord: number;
  idCategory: number;
  idProduct: number;
  idProvider: number;
  nameProvider: string;
  nameCategory: string;
  nameProduct: string;
  dateInputRecord: string;
  expirationDateIRecord: string;
  countIRecord: number;
  priceBuyIRecord: number;
  statusIRecord: boolean;
}

export interface IRecordICreate {
  idProduct: number;
  idProvider: number;
  dateInputRecord: string;
  expirationDateIRecord: string;
  countIRecord: number;
  priceBuyIRecord: number;
}

export interface IRecordIUpdate {
  idInputRecord: number;
  idProduct: number;
  idProvider: number;
  dateInputRecord: string;
  expirationDateIRecord: string;
  countIRecord: number;
  priceBuyIRecord: number;
  statusIRecord: boolean;
}

export interface IPaginationRecordInput {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorRecordInput {
  message: string;
}
export interface IResponseRecordInputs {
  message: string;
  info: IPaginationRecordInput;
  results: IRecordInput[];
}

export interface IResponseRecordnput {
  message: string;
  value: IRecordInput;
}
