import React from "react";

const OrderDetailInfo = () => {
  const id = 124534124542;
  const orderDate = new Date(); // Using current date and time

  // Define options for formatting the date
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  // Format the orderDate
  const formattedOrderDate = orderDate.toLocaleString("en-US", options);

  return (
    <div>
      <div className="py-2 pt-4">Order Information</div>
      <div className="flex justify-between py-2 text-gray-500">
        Order ID
        <div className="text-white">{id}</div>
      </div>
      <div className="flex justify-between text-gray-500">
        Order Date
        <div className="text-white">{formattedOrderDate}</div>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
