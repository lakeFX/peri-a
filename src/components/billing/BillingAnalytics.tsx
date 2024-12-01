import React, { useMemo } from "react";
import { useBillingStore } from "../../store/billingStore";

export const BillingAnalytics = React.memo(() => { // Ensure this is a named export
  const { items } = useBillingStore();

  const analytics = useMemo(
    () => ({
      totalBilled: items.reduce((sum, item) => sum + item.amount, 0),
      totalPaid: items.reduce((sum, item) => sum + item.paid, 0),
      totalPending: items.filter((item) => item.status === "pending").length,
      collectionRate:
        (items.reduce((sum, item) => sum + item.paid, 0) /
          items.reduce((sum, item) => sum + item.amount, 0)) *
        100,
    }),
    [items],
  );

  return (
    <div>
      <h2>Billing Analytics</h2>
      <div>Total Billed: {analytics.totalBilled}</div>
      <div>Total Paid: {analytics.totalPaid}</div>
      <div>Total Pending: {analytics.totalPending}</div>
      <div>Collection Rate: {analytics.collectionRate.toFixed(2)}%</div>
    </div>
  );
});