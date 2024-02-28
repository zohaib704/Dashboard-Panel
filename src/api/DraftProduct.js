import axiosInstance from "@/utils/axiosConfigure"


const DraftProduct = async () => {
const response= await axiosInstance.get("http://207.180.200.209:5000/api/auth/getDraftProducts")
console.log(response.data.products);
    return  response.data.products
}

export default DraftProduct
