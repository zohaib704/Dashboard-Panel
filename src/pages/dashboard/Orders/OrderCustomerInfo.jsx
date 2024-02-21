import React from "react";

const OrderCustomerInfo = () => {
  let name = "Aida Bugg";
  let email = "aidabug@gmail.com";
  return (
    <div>
      <div className="py-2 font-nunito">Customer Information</div>
      <div className="flex justify-between py-2 text-gray-500 font-nunito">
        Customer
        <div className="text-white font-nunito">{name}</div>
      </div>
      <div className="flex justify-between text-gray-500 font-nunito">
        Customer Contact
        <div className="text-white font-nunito">{email}</div>
      </div>
    </div>
  );
};

export default OrderCustomerInfo;
