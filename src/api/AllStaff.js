import axiosInstance from "@/utils/axiosConfigure"

const AllStaff = async () => {
  const response= await axiosInstance.get("http://207.180.200.209:5000/api/auth/staff")
  return response.data.staff
}

export default AllStaff
