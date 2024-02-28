import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Input } from "@material-tailwind/react";
import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import Addstaff from "@/api/AddStaff";


const AddStaff = ({ closeModal }) => {
  const [email, setEmail] = useState(); 

  const handleAddStaff =  () => {
    try {
      Addstaff({ email }); 
    } catch (error) {
      console.log(error);
      toast.error("Server error,Please refresh the page...");
    }
    
  };

  return (
    <div className="flex justify-center items-center backdrop-filter backdrop-blur-sm bg-opacity-50 w-full h-full absolute z-50">
      <div className="text-white bg-[#2C2C2E] rounded-2xl p-6 py-9">
        <div className="flex justify-between pb-5 font-semibold font-nunito">
          <div className="font-nunito text-2xl">Add Staff</div>
          <div className="text-2xl">
            <IoMdClose onClick={() => closeModal(false)} className="cursor-pointer" />
          </div>
        </div>
        <div className="font-nunito pt-3 pb-4">Enter Staff Email</div>
        <div className="w-72">
          <Input
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            label="Email"
            size="lg"
            color="white"
            variant="outlined"
            icon={<FiMail className="text-[#BA5EEF]" />}
          />
        </div>
        <div className="pt-12 py-3 flex justify-end">
          <button
            onClick={handleAddStaff}
            className="bg-[#BA5EEF] rounded-full text-white py-2 px-10 mt-2 md:mt-0 md:ml-2"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
