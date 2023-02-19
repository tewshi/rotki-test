export interface Asset {
  amount: string;
  usd_value: string;
  name: string;
  percentage?: string;
}

export type Assets = Record<string, Asset>;
