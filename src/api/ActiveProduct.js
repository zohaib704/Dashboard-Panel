import axiosInstance from '@/utils/axiosConfigure';

const ActiveProducts = async () => {
  try {
    const response = await axiosInstance.get("http://207.180.200.209:5000/api/auth/activeproducts");
    // console.log(response.data.products)
    return response.data.products; 
  } catch (error) {

    throw error; 
  }
};

export default ActiveProducts;

