import React from "react";

const OrderPaymentInfo = () => {
  let pmethod = "Paypal";
  let items = "07";
  let price = "23.21";
  let Charges = "$4.01";
  let total = "$27.22";
  return (
    <div>
      <div className="py-2">Payment Information</div>
      <div className="flex justify-between py-2 text-gray-500">
        Payment Method
        <div className="text-white">{pmethod}</div>
      </div>
      <div className="flex justify-between py-2 text-gray-500">
        Total Items
        <div className="text-white">{items}</div>
      </div>
      <div className="flex justify-between py-2 text-gray-500">
        Total
        <div className="text-white">{price}</div>
      </div>
      <div className="flex justify-between py-2 text-gray-500">
        Shipping Charges
        <div className="text-white">{Charges}</div>
      </div>
      <div className="flex justify-between py-2 text-gray-500">
        Subtotal
        <div className="text-white">{total}</div>
      </div>
    </div>
  );
};

export default OrderPaymentInfo;
