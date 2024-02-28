import axiosInstance from '@/utils/axiosConfigure'


const Addstaff = async (data) => {
    const post=await axiosInstance.post("http://207.180.200.209:5000/api/auth/addStaff", data)
    return post;
}

export default Addstaff
