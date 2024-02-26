import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaRegEnvelope } from "react-icons/fa";
import { Input } from "@material-tailwind/react";
import { FiMail } from "react-icons/fi";

const StaffEdit = ({closeModal}) => {
  return (
    <div className="flex justify-center items-center  backdrop-filter backdrop-blur-sm bg-opacity-50 w-[100%] h-[100%] absolute  z-50">
      <div className="text-white bg-[#2C2C2E] rounded-2xl  p-6 py-9  ">
        <div className="flex justify-between pb-5 font-semibold font-nunito ">
          <div className="font-nunito text-2xl">Add Staff</div>
          <div className="text-2xl">
            <IoMdClose onClick={()=>closeModal(false)} className="cursor-pointer" />
          </div>
        </div>
        <div className="font-nunito pt-3 pb-4">Enter Staff Email</div>
        
        <div className="w-72 ">
      <Input 
      type="email"
      label="Email" 
     size="lg"
     color="white"
     variant = "outlined"
     
      icon={<i className="fas fa-envelope    text-[#BA5EEF] " />} />
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

export default StaffEdit;
