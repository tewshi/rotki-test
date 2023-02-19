import type { ApiResponse } from "@/types/api";

export interface EventValue {
  amount: string;
  usd_value: string;
}

export interface TransactionEvent {
  event_type: "deposit" | "withdraw";
  asset: string;
  value: EventValue;
  timestamp: number;
  wallet: string;
}

export type TransactionEvents = Record<string, { events: TransactionEvent[] }>;

export type TransactionEventsResponse = ApiResponse<TransactionEvents>;
