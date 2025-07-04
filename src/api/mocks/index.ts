import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { loginMock } from "./login-mock";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period-mock";
import { getDayOrdersAmountMock } from "./get-day-orders-amount-mock";
import { getMonthCanceledOrdersAmountMock } from "./get-month-canceled-orders-amount-mock";
import { getMonthOrdersAmountMock } from "./get-month-orders-amount-mock";
import { getMonthRevenueMock } from "./get-month-revenue-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";
import { getProfileMock } from "./get-profile-mock";
import { getManagedRestaurantMock } from "./get-managed-restaurants-mock";
import { updateProfileMock } from "./update-profile-mock";
import { getOrdersMock } from "./get-orders-mock";
import { getOrderDetailsMock } from "./get-order-details-mock";
import {
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
} from "./order-actions-mock";
import { registerRestaurantMock } from "./register-restaurant-mock";

export const worker = setupWorker(
  loginMock,
  getDailyRevenueInPeriodMock,
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthRevenueMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  cancelOrderMock,
  dispatchOrderMock,
  approveOrderMock,
  deliverOrderMock,
  registerRestaurantMock,
);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }

  await worker.start();
}
