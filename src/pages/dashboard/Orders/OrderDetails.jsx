import React from "react";
import { IoMdClose } from "react-icons/io";
import orderD from "../../../../public/img/Orderimg/ordDetail.png";
import OrderDetailInfo from "./OrderDetailInfo";
import OrderCustomerInfo from "./OrderCustomerInfo";
import OrderPaymentInfo from "./OrderPaymentInfo";
import { FaDollarSign } from "react-icons/fa6";

const OrderDetails = () => {
  return (
    <div className="flex justify-center">
      <div className="text-white bg-[#2C2C2E] rounded-2xl p-4 py-7 px-6 w-full lg:w-[60%]">
        <div className="flex justify-between pb-8 text-2xl font-semibold font-nunito ">
          <div className="font-nunito ">Order Detail</div>
          <div>
            <IoMdClose className="cursor-pointer" />
          </div>
        </div>
        <div>
          <div className="bg-black rounded-2xl">
            <div className="flex items-center">
              <div className="p-4">
                <img
                  src={orderD}
                  alt="picture"
                  className="h-[80%] cursor-pointer"
                />
              </div>
              <div className="pt-4">
                <button className="text-white font-nunito">
                  Comb & Scissors
                </button>
                <div className="flex items-center">
                  <FaDollarSign />
                  <p className="text-white font-nunito">2.47</p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-3 font-nunito">
            <OrderDetailInfo />
          </div>
          <div className="py-3 font-nunito">
            <OrderCustomerInfo />
          </div>
          <div className="py-3 font-nunito">
            <OrderPaymentInfo />
          </div>
          <div className="py-2 font-nunito">Shipping Address</div>
          <div className="text-gray-500 font-nunito">
            26 Division Rd.Hixson, TN 37343 9618 E. Meadowok St.Augusta, GA
            30906
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
