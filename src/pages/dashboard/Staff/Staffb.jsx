import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaRegEnvelope } from "react-icons/fa";

const Staffb = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-white bg-[#2C2C2E] rounded-2xl p-6 py-9 w-full lg:w-[60%]">
        <div className="flex justify-between pb-5 font-semibold font-nunito ">
          <div className="font-nunito text-2xl">Add Staff</div>
          <div className="text-2xl">
            <IoMdClose className="cursor-pointer" />
          </div>
        </div>
        <div className="font-nunito pt-3 pb-4">Enter Staff Email</div>
        <div>
          <div className="bg-[#1C1C1E] rounded-full">
            <div className="flex items-center">
              <div className="py-3 px-6 text-2xl text-[#FFFFFF]">
                <FaRegEnvelope className="cursor-pointer" />
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  className="w-[90%] lg:w-full font-nunito bg-[#1C1C1E] text-[#FFFFFF]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12 py-3 flex justify-end">
          <button className="bg-[#BA5EEF] rounded-full text-white py-2 px-10 mt-2 md:mt-0 md:ml-2 ">
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Staffb;
