import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaRegEnvelope, FaAngleDown } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { MdCheck } from "react-icons/md";

const AddProduct = ({closeAddProduct}) => {
  const [number, setNumber] = useState(1);
  const [isChecked, setIsChecked] = useState(false); //For Checkbox
  const [stock, setStock] = useState(1); // Initial stock value
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileUpload = (files) => {
    setSelectedFiles(Array.from(files));
    
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
    <form className="flex justify-center items-center font-nunito backdrop-filter  backdrop-blur-sm z-50 absolute w-[75%] ">
      <div className="text-white bg-[#2C2C2E] rounded-2xl px-6 py-9 w-full md:w-[80%] lg:w-[60%] ">
        <div className="editStoke">
          <div className="flex justify-between  font-bold font-nunito ">
            <div className="font-nunito font-bold text-xl">
              Edit Your Product
            </div>
            <div className="text-2xl">
              <IoMdClose
              onClick={()=>closeAddProduct(false)}
               className="cursor-pointer hover:text-red-700 hover:scale-150" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-nunito font-medium pt-3 pb-4 text-base">
              Edit Stock
            </div>
            <div className="font-nunito text-[#ffffffb2] pt-3 pb-4 ml-6 text-sm">
              {stock.toString().padStart(1, "0")} in Stock
            </div>
          </div>

          <div>
            <div className="bg-[#1C1C1E] rounded-xl">
              <div className="flex justify-between items-center">
                <div className="py-2 px-6 text-2xl text-[#ffffff]">
                  <div>{number.toString().padStart(1, "0")}</div>
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
        </div>

        <div className="py-1">
          <div className="bg-[#1C1C1E] rounded-xl p-4 md:py-2 px-5">
            <h1 className="pb-2 font-nunito font-medium text-base">
              Product Images
            </h1>
            <label
              htmlFor="fileUpload"
              className="flex justify-center items-center border-gray-600 border-[2px] border-dashed 
              w-[60%] md:w-[25%] rounded-2xl   cursor-pointer"
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
            <h1 className="py-1 font-nunito text-base font-medium">
              Product Title
            </h1>
            <div className="bg-[#1C1C1E] rounded-xl py-2 px-3">
              <input
                name="productTitle"
                type="text"
                placeholder="Comb & Scissors"
                className="bg-[#1C1C1E] text-white w-full focus:outline-none"
                
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="py-1 font-nunito text-base font-medium">Price</h1>
            <div className="bg-[#1C1C1E] rounded-xl py-2 px-3">
              <input
              name="productPrice"
                type="text"
                placeholder="$25"
                className="bg-[#1C1C1E] text-white w-full focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className=" flex-col gap-4 md:flex-row md:gap-5">
          <h1 className="pb-2 pt-4 font-nunito text-base font-medium">
            Product Description
          </h1>

          <textarea
            rows="2"
            cols="auto"
            placeholder="Write Product Description"
            className="bg-[#1C1C1E] w-full py-1 px-2 leading-7 pt-5 rounded-xl font-nunito outline-none "
          />
        </div>
        <div className="flex flex-col md:flex-row md:gap-5">
          <div className="w-full md:w-1/2">
            <h1 className="pb-2 pt-4  font-nunito text-base font-medium">
              Delivery Charges
            </h1>
            <div className="bg-[#1C1C1E] rounded-xl py-2 px-3   ">
              <input
                type="text"
                placeholder="$0"
                className="bg-[#1C1C1E] text-white w-full focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="pb-2 pt-4  font-nunito text-base font-medium">Discount</h1>
            <div className="bg-[#1C1C1E] rounded-xl py-2 px-3 ">
              <input
                type="text"
                placeholder="25%"
                className="bg-[#1C1C1E] text-white w-full focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Check Box */}
   
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
              className="inline-block w-4 h-4 bg-white  relative cursor-pointer"
            >
              {isChecked && (
                <MdCheck className="absolute  bg-[#BA5EEF] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white" />
              )}
            </label>
            <div className="ml-4 pb-2 pt-2 font-nunito text-base font-medium">Free Delivery</div>
          </div>
       

        <div className=" py-3 flex justify-between flex-col md:flex-row">
          <div className="flex items-center text-[#FFFFFF] font-nunito md:mb-0">
            <div className="whitespace-nowrap">Advanced Settings</div>
            <div className="ml-1 md:ml-2 text-[#FFFFFF] font-nunito">
              <FaAngleDown className="cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-end md:items-center">
            <button className="bg-gray-600 rounded-full font-nunito text-white py-3 px-7 mt-2 md:mt-0 md:mr-2 md:order-1 hover:bg-opacity-90">
              Inactive Product
            </button>
            <button 
             onClick={()=>closeAddProduct(false)}
            className="text-white bg-[#BA5EEF] items-center hover:bg-opacity-90  font-nunito rounded-full py-3 px-14 mt-2 md:mt-0 md:order-2">
              Update
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct; 