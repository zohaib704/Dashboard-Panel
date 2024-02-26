import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaRegEnvelope, FaAngleDown } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const EditProduct = () => {
  const [number, setNumber] = useState(1);
  const [stock, setStock] = useState(1); // Initial stock value

  const handleIncrement = () => {
    setNumber((prevNumber) => prevNumber + 1);
    setStock((prevStock) => prevStock + 1);
  };

  const handleDecrement = () => {
    if (number > 1) {
      setNumber((prevNumber) => prevNumber - 1);
      setStock((prevStock) => prevStock - 1);
    }
  };

  const handleChange = (e) => {
    const newNumber = parseInt(e.target.value);
    if (!isNaN(newNumber)) {
      setNumber(newNumber);
      setStock(newNumber);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-white bg-[#2C2C2E] rounded-2xl font-nunito p-6 py-9 w-full md:w-[80%] lg:w-[60%]">
        <div className="flex justify-between pb-5 font-semibold font-nunito ">
          <div className="font-nunito text-[29px]">Edit Your Product</div>
          <div className="text-2xl">
            <IoMdClose className="cursor-pointer" />
          </div>
        </div>
        <div className="flex">
          <div className="font-nunito pt-3 pb-4 text-[19px]">Edit Stock</div>
          <div className="font-nunito text-[#ffffffa8] pt-3 pb-4 ml-4 text-[19px]">
            {stock.toString().padStart(2, "0")} in Stock
          </div>
        </div>

        <div>
          <div className="bg-[#1C1C1E] rounded-2xl">
            <div className="flex justify-between items-center">
              <div className="py-3 px-6 text-2xl text-[#FFFFFF]">
                <div>{number.toString().padStart(2, "0")}</div>
              </div>
              <div className="flex text-2xl pr-3">
                <div onClick={handleDecrement} className="mr-1">
                  <IoMdArrowDropdown className="cursor-pointer text-white bg-[#BA5EEF] rounded-md" />
                </div>
                <div onClick={handleIncrement} className="cursor-pointer">
                  <IoMdArrowDropup className="cursor-pointer text-white bg-[#BA5EEF] rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12 py-3 flex justify-between flex-col md:flex-row">
          <div className="flex items-center text-[#FFFFFF] font-nunito md:mb-0">
            <div className="whitespace-nowrap text-[19px]">
              Advanced Settings
            </div>
            <div className="ml-2 text-[#FFFFFF] font-nunito">
              <FaAngleDown />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-end md:items-center">
            <button className="bg-gray-600 rounded-full whitespace-nowrap font-nunito text-white py-3 px-7 mt-2 md:mt-0 md:mr-2 md:order-1">
              Inactive Product
            </button>
            <button className="bg-[#BA5EEF] whitespace-nowrap font-nunito rounded-full text-white py-3 px-14 mt-2 md:mt-0 md:order-2">
              Update Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
