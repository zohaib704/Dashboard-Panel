import axiosInstance from '@/utils/axiosConfigure'

const InactiveProduct = async () => {
    const response= await axiosInstance.get("http://207.180.200.209:5000/api/auth/inActiveProducts")

  return response.data.products
}

export default InactiveProduct
