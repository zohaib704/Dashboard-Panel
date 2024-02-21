import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaRegEnvelope, FaAngleDown } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { MdCheck } from "react-icons/md";

const EditProductb = () => {
  const [number, setNumber] = useState(1);
  const [isChecked, setIsChecked] = useState(false); //For Checkbox
  const [stock, setStock] = useState(1); // Initial stock value
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileUpload = (files) => {
    setSelectedFiles(Array.from(files));
    // You can perform additional actions here, such as uploading the files to a server
  };

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

  //For Checkbox
  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <form className="flex justify-center items-center font-nunito">
      <div className="text-white bg-[#2C2C2E] rounded-2xl p-6 py-9 w-full md:w-[80%] lg:w-[60%]">
        <div className="flex justify-between pb-5 font-semibold font-nunito ">
          <div className="font-nunito text-[29px] ">Edit Your Product</div>
          <div className="text-2xl">
            <IoMdClose className="cursor-pointer" />
          </div>
        </div>
        <div className="flex">
          <div className="font-nunito pt-3 pb-4 text-[19px]">Edit Stock</div>
          <div className="font-nunito text-[#ffffffb2] pt-3 pb-4 ml-6 text-[19px]">
            {stock.toString().padStart(2, "0")} in Stock
          </div>
        </div>

        <div>
          <div className="bg-[#1C1C1E] rounded-2xl">
            <div className="flex justify-between items-center">
              <div className="py-3 px-6 text-2xl text-[#ffffff]">
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
        <div className="py-4">
          <div className="bg-[#1C1C1E] rounded-2xl p-4 md:p-7">
            <div className="pb-5 text-[19px]">Product Images</div>
            <label
              htmlFor="fileUpload"
              className="flex justify-center items-center border-gray-600 border-[2px] border-dashed 
              w-[60%] md:w-[20%] rounded-2xl py-9 px-8 cursor-pointer"
              style={{ padding: "34px" }}
            >
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <LuPlus className="text-lg md:text-3xl" />
            </label>
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-white">Selected Files:</h4>
                <ul className="text-white">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-5">
          <div className="w-full md:w-1/2">
            <div className="py-3 text-[19px]">Product Title</div>
            <div className="bg-[#1C1C1E] rounded-2xl p-4">
              <input
                type="text"
                placeholder="Comb & Scissors"
                className="bg-[#1C1C1E] text-white w-full focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="py-3 text-[19px]">Price</div>
            <div className="bg-[#1C1C1E] rounded-2xl p-4">
              <input
                type="text"
                placeholder="$25"
                className="bg-[#1C1C1E] text-white w-full focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="py-5 flex-col gap-4 md:flex-row md:gap-5">
          <div className="py-5 text-[19px]">Product Description</div>
          <div className="">
            <textarea
              rows="4"
              cols="65"
              className="w-full md:w-[100%] bg-[#1C1C1E] rounded-2xl p-4"
            >
              Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat.
              Morbi in orci risus. Donec pretium f
            </textarea>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-5">
          <div className="w-full md:w-1/2">
            <div className="py-3 whitespace-nowrap text-[19px]">
              Delivery Charges
            </div>
            <div className="bg-[#1C1C1E] rounded-2xl p-4 ">
              <input
                type="text"
                placeholder="$0"
                className="bg-[#1C1C1E] text-white w-full focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="py-3 text-[19px]">Discount</div>
            <div className="bg-[#1C1C1E] rounded-2xl p-4 ">
              <input
                type="text"
                placeholder="$-25"
                className="bg-[#1C1C1E] text-white w-full focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Check Box */}
        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="customCheckbox"
              className="hidden"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="customCheckbox"
              className="inline-block w-6 h-6 bg-[#BA5EEF] rounded-md relative cursor-pointer"
            >
              {isChecked && (
                <MdCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white" />
              )}
            </label>
            <div className="ml-4 text-[19px]">Free Delivery</div>
          </div>
        </div>
        <div className="pt-12 py-3 flex justify-between flex-col md:flex-row">
          <div className="flex items-center text-[#FFFFFF] font-nunito md:mb-0">
            <div className="whitespace-nowrap">Advanced Settings</div>
            <div className="ml-1 md:ml-2 text-[#FFFFFF] font-nunito">
              <FaAngleDown className="cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-end md:items-center">
            <button className="bg-gray-600 rounded-full font-nunito text-white py-3 px-7 mt-2 md:mt-0 md:mr-2 md:order-1">
              Inactive Product
            </button>
            <button className="bg-[#BA5EEF] font-nunito rounded-full text-white py-3 px-14 mt-2 md:mt-0 md:order-2">
              Update
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProductb;
