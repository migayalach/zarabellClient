export interface PurchaseMonthBuysResults {
  results: {
    sales: {
      cantidadvendidos: number;
      cantidadvendidosviajado: number;
      porcentajecantidadvendidosviajado: number;
      porcentajecantidadvendidosrecibidos: number;
      cantidadvendidosconfirmados: number;
      porcentajecantidadvendidosconfirmados: number;
      porcentajecantidadvendidoscancelados: number;
      porcentajecantidadvendidospendientesderevision: number;
      montototal: number;
    };
    demographicData: {
      cantidad: number;
      orden: number;
      rango: string;
    }[];
    topRoutes: {
      city: string;
      percentage: number;
      color: string;
    }[];
    geographicData: {
      country: string;
      percentage: number;
      color: string;
    }[];
    originSales: {
      salesFromCompany: number;
      salesFromTB: number;
    };
  };
}

export interface PurchaseMonthBuys extends PurchaseMonthBuysResults {
  message: string;
}

export interface MonthBuyData {
  filtroventas: string;
  year: number | number;
  month: number | number;
  pagina?: string;
}

export interface PurchaseMonthSearchResults {
  results: {
    search: {
      numberSearchs: number;
      ratioconverion: number;
    };
    topRoutes: {
      city: string;
      percentage: number;
      color: string;
    }[];
    geographicData: {
      country: string;
      percentage: number;
      color: string;
    }[];
    originSearchs: {
      salesFromCompany: number;
      salesFromTB: number;
    };
  };
}

export interface PurchaseMonthSearch extends PurchaseMonthSearchResults {
  status: number;
  message: string;
}

export interface MonthSearchData {
  filtrobusqueda: string;
  year: number | number;
  month: number | number;
  pagina?: string;
}
