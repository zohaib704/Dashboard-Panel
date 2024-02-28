import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
} from "@material-tailwind/react";

import { BsSearch } from "react-icons/bs";

import AddProduct from "../sessions/AddProduct";
import ActiveProducts from "@/api/ActiveProduct";
import StoreProductTable from "./StoreProductTable";
import OutOfStock from "@/api/OutOfStock";
import InactiveProduct from "@/api/InactiveProduct";
import DraftProduct from "@/api/DraftProduct";

const StoreProduct = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [activeTab, setActiveTab] = useState("Active");
  const [activeProduct, setActiveProduct] = useState([]);
  const [draftProduct, setDraftProduct] = useState([]);
  const [outofStock, setoutofStock] = useState([]);
  const [inactiveProduct, setInactiveProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeProductsData = await ActiveProducts();
        const draftProductsData = await DraftProduct();
        const outOfStockData = await OutOfStock();
        const inactiveProductsData = await InactiveProduct();

        setActiveProduct(activeProductsData);
        setDraftProduct(draftProductsData);
        setoutofStock(outOfStockData);
        setInactiveProduct(inactiveProductsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

// console.log(activeProduct);
  const filteredActiveProduct  =activeProduct.filter((product)=>product.name.toLowerCase().includes(searchTerm))
  const filteredDraftProduct  =draftProduct.filter((product)=>product.name.toLowerCase().includes(searchTerm))
  const filteredOutOfStock  =outofStock.filter((product)=>product.name.toLowerCase().includes(searchTerm))
  const filteredInactiveProduct  =inactiveProduct.filter((product)=>product.name.toLowerCase().includes(searchTerm))

  const data = [
    { label: "Active" },
    { label: "Draft" },
    { label: "Out of Stock" },
    { label: "In Active" },
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Active":
        return <StoreProductTable propsTableData={filteredActiveProduct } />;
      case "Draft":
        return <StoreProductTable propsTableData={filteredDraftProduct} />;
      case "Out of Stock":
        return <StoreProductTable propsTableData={filteredOutOfStock} />;
      case "In Active":
        return <StoreProductTable propsTableData={filteredInactiveProduct} />;
      default:
        return null;
    }
  };
  //  Tabs functionaly ends here

  // Search logic

  // const [productData, setProductData] = useState();
  // const handleSearchProducts = (event) => {
  //   const searchTerm = event.target.value.toLowerCase();
  //   const newSearchData = propsTableData.filter((product) =>
  //     product.Name.toLowerCase().includes(searchTerm),
  //   );
  //   setProductData(newSearchData);
  // };

  // Delete logic
  // const handleDeleteSingleProduct = (id) => {
  //   const updatedData = productData.filter((product) => product.ID !== id);
  //   setProductData(updatedData);
  // };
  return (
    <div>
      {/* Add StoreProduct  Modal Called Here  */}
      {addProduct && <AddProduct closeAddProduct={setAddProduct} />}

      <Card className="overflow-hidden xl:col-span-2  mt-5 bg-[#1f1f21]">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 flex flex-col md:flex-row items-center justify-between sm:p-6 p-2"
        >
          <div className="md:w-auto w-full mb-5 sm:mb-0">
            <Typography variant="h5" color="white" className="mb-1">
              Products
            </Typography>
            <Typography variant="small">Manage Your Products</Typography>
          </div>
          <div className="flex gap-x-1 sm:gap-x-3 justify-start md:justify-end md:w-[55%] w-[100%]">
            <div className="relative flex md:w-[55%] w-[70%] items-center ">
              <input
                type="text"
                onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="bg-black text-white py-2 px-2 w-[100%] rounded-3xl"
              />
              <div className="absolute right-3   flex items-center pointer-events-none">
                <BsSearch className="h-4 w-4 text-white" />
              </div>
            </div>

            <button
              onClick={() => setAddProduct(true)}
              type="submit"
              className=" text-white bg-[#BA5EEF] items-center hover:bg-opacity-90 
            px-1  sm:px-6  
            py-3  md:py-2 rounded-3xl  text-xs md:text-base"
            >
              Add Product
            </button>
          </div>
        </CardHeader>
        {/* Tabs Render Here Having All Tables Data  */}
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none  text-white border-b sm:w-[50%] w-[100%] mt-5  
        bg-[#1f1f1f] border-blue-gray-50 p-0"
            indicatorProps={{
              className:
                "bg-[#2C2C2E] border-b-4 border-gray-900 shadow-none rounded-none ",
            }}
          >
            {data.map(({ label }) => (
              <Tab
                key={label}
                value={label}
                onClick={() => handleTabChange(label)}
                className={`${
                  activeTab === label ? "border-b-2 text-white" : "text-white"
                }`}
              >
                <Typography
                  variant="small"
                  className="text-[11px]  font-bold uppercase text-white"
                >
                  {label}
                </Typography>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>{renderTabContent()}</TabsBody>
        </Tabs>
      </Card>
    </div>
  );
};

export default StoreProduct;
