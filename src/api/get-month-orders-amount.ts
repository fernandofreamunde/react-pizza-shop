import { api } from "@/lib/axios";

export interface GetMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
  const resp = await api.get<GetMonthOrdersAmountResponse>(
    "/metrics/month-orders-amount",
  );

  return resp.data;
}
