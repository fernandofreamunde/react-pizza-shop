import { http, HttpResponse } from "msw";
import type { ApproveOrderParams } from "../approve-order";
import type { CancelOrderParams } from "../cancel-order";
import type { DispatchOrderParams } from "../dispatch-order";
import type { DeliverOrderParams } from "../deliver-order";

export const approveOrderMock = http.patch<ApproveOrderParams, never, never>(
  "/orders/:orderId/approve",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);

export const cancelOrderMock = http.patch<CancelOrderParams, never, never>(
  "/orders/:orderId/cancel",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);

export const dispatchOrderMock = http.patch<DispatchOrderParams, never, never>(
  "/orders/:orderId/dispatch",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);

export const deliverOrderMock = http.patch<DeliverOrderParams, never, never>(
  "/orders/:orderId/deliver",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);
