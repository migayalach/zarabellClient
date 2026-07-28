export interface ISellersData {
  nameProvider: string;
  nameProduct: string;
  totalSold: number;
}

export interface INearExpirationData {
  nameProvider: string;
  nameProduct: string;
  days: string;
}

export interface ISalesTodayData {
  totalWinToday: number;
  productsSoldToday: number;
}

export interface ISalesYesterdayData {
  totalWinYesterday: number;
  productsSoldYesterday: number;
}

export interface IDashboardData {
  bestSellers: ISellersData[];
  lessSellers: ISellersData[];
  nearExpiration: INearExpirationData[];
  todaySales: ISalesTodayData;
  yesterdaySales: ISalesYesterdayData;
  totalProducts: number;
  totalOutputsCurrentMonth: number;
  totalLotsToExpiration: number;
}

export interface IDashboardResponse {
  success: boolean;
  message: string;
  results: IDashboardData;
}

export interface IErrorDashboard {
  message: string;
}