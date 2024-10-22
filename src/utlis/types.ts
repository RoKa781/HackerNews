export interface Item {
  id: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
}

export type TStatus = "idle" | "loading" | "succeeded" | "failed";

export enum EStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}