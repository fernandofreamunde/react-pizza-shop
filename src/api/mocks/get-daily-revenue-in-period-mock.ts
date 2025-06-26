import { http, HttpResponse } from "msw";
import type { GetDailyRevenueInPeriodResponse } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    { date: "1/1/2025", receipt: 2000 },
    { date: "2/1/2025", receipt: 2500 },
    { date: "3/1/2025", receipt: 2000 },
    { date: "4/1/2025", receipt: 1500 },
    { date: "5/1/2025", receipt: 2000 },
    { date: "6/1/2025", receipt: 1500 },
    { date: "7/1/2025", receipt: 2000 },
  ]);
});
