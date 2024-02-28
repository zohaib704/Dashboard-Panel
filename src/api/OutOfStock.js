import axiosInstance from '@/utils/axiosConfigure';

const OutOfStock = async () => {
  try {
    const resp = await axiosInstance.get("http://207.180.200.209:5000/api/auth/OutOfStock");
    // console.log(resp.data.products);
   return resp.data.products
  } catch (error) {

    throw error; 
  }
};

export default OutOfStock;
