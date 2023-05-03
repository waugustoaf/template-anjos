export interface IDashboard {
  financial: IDashFinancial;
  statistics: IDashStatistics;
  campaign: IDashCampaign;
  leads: IDashLeads;
  leadsConversion: IDashLeadsConversion[];
  goalPoints: IDashGoalPoint[];
  productByFinancial: IDashProduct[];
  productBySales: IDashProduct[];
  salesByStrategies: IDashSalesStrategies[];
  strategyConversionValue:IDashStrategyConversion[];
  strategyConversionQuantity:IDashStrategyConversion[];
}


export interface IDashFinancial {
  value: number;
  percent: number;
}

export interface IDashStatistics {
  leads: number;
  sales: number;
  middleticket: number;
}

export interface IDashCampaign {
  percent: number;
  daysOf: number;
  goal: number;
  endMonthDays: number;
  campaignStatus: string;
}

export interface IDashLeads {
  quantity: number;
  convert: number;
  noConverted: number;
}

export interface IDashLeadsConversion {
  strategyId?: string;
  name?: string;
  gain?: number;
  lost?: number;
}

export interface IDashGoalPoint{
  name: string;
  goal: number;
  quantity: number;
}

export interface IDashProduct {
  productId: string;
  name: string;
  image: string;
  value: number;
  quantity: number;
}

export interface IDashSalesStrategies {
  strategyId: string;
  icon: string;
  name: string;
  value: number;
}

export interface IDashStrategyConversion {
  strategyId: string;
  icon: string;
  name: string;
  value: number;
  quantity: number;
}
