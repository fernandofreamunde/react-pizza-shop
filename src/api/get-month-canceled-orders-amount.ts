import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
  const resp = await api.get<GetMonthCanceledOrdersAmountResponse>(
    "/metrics/month-canceled-orders-amount",
  );

  return resp.data;
}
