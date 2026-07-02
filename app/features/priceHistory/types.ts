export interface IPriceHistory {
  idInputRecord: number;
  idPriceHistory: number;
  nameProduct: string;
  dateStartHistory: string;
  dateEndHistory: string;
  priceBuyIRecord: number;
  countIRecord: number;
  unitPriceHistory: number;
  quarterPriceHistory: number;
  dozenPriceHistory: number;
  mayorPriceHistory: number;
  detailHistory: string;
}

export interface IPriceHistoryCreate {
  idInputRecord: number;
  dateStartHistory: string;
  unitPriceHistory: number;
  quarterPriceHistory: number;
  dozenPriceHistory: number;
  mayorPriceHistory: number;
  detailHistory: string;
}

export interface IPriceHistoryUpdate {
  idPriceHistory: number;
  idInputRecord: number;
  dateStartHistory: string;
  dateEndHistory: string;
  unitPriceHistory: number;
  quarterPriceHistory: number;
  dozenPriceHistory: number;
  mayorPriceHistory: number;
  detailHistory: string;
}

export interface IPaginationPriceHistory {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorPriceHistory {
  message: string;
}
export interface IResponsePriceHistories {
  message: string;
  info: IPaginationPriceHistory;
  results: IPriceHistory[];
}

export interface IResponsePriceHistory {
  success: boolean;
  message: string;
  value: IPriceHistory;
}
