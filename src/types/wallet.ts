import type { Asset } from "@/types/asset";
import type { ApiResponse } from "@/types/api";

export type Wallet = Record<string, Asset>;

export type Wallets = Record<string, Wallet>;

export type WalletsResponse = ApiResponse<Wallets>;
