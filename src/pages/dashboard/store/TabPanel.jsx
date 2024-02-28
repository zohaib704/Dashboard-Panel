import React, { useEffect, useState } from 'react';
import { Tabs, TabsHeader, Tab, TabsBody, Typography } from '@material-tailwind/react';
import StoreProductTable from './StoreProductTable';
import ActiveProducts from '@/api/ActiveProduct';
import OutOfStock from '@/api/OutOfStock';
import InactiveProduct from '@/api/InactiveProduct';
import DraftProduct from '@/api/DraftProduct';

const TabPanels = () => {
  const [activeTab, setActiveTab] = useState('Active'); 
  const [activeProduct, setActiveProduct] = useState([]);
  const [draftProduct, setDraftProduct] = useState([]);
  const [outofStock, setoutofStock] = useState([]);
  const [inactiveProduct, setInactiveProduct] = useState([]);

  


  useEffect(() => {
    const fetchActiveProduct = async () => {
      try {
        const productsData = await ActiveProducts();
        setActiveProduct(productsData);
      } catch (error) {
        console.error("Error fetching active products:", error);
      }
    };

    const fetchDraftProduct = async () => {
      try {
        const productsData = await DraftProduct();
        setDraftProduct(productsData);
      } catch (error) {
        console.error("Error fetching active products:", error);
      }
    };

    const fetchOutofStock = async () => {
      try {
        const productsData = await OutOfStock();
        setoutofStock(productsData);
      } catch (error) {
        console.error("Error fetching active products:", error);
      }
    };

    
    const fetchInactiveProduct = async () => {
      try {
        const productsData = await InactiveProduct();
        setInactiveProduct(productsData);
      } catch (error) {
        console.error("Error fetching active products:", error);
      }
    };
    fetchInactiveProduct()
    fetchDraftProduct()
    fetchOutofStock();
    fetchActiveProduct();
  }, []);

  const data = [
    { label: 'Active' },
    { label: 'Draft' },
    { label: 'Out of Stock' },
    { label: 'In Active' }
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Active':
        return <StoreProductTable propsTableData={activeProduct}/>
       
      case 'Draft':
        return <StoreProductTable propsTableData={draftProduct} />
      case 'Out of Stock':
        return <StoreProductTable propsTableData={outofStock} />
      case 'In Active':
        return <StoreProductTable propsTableData={inactiveProduct} />
      default:
        return null; 
    }
  };
  // console.log(inactiveProduct);
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none  text-white border-b sm:w-[50%] w-[100%] mt-5  
        bg-[#1f1f1f] border-blue-gray-50 p-0"
        indicatorProps={{
          className: "bg-[#2C2C2E] border-b-4 border-gray-900 shadow-none rounded-none ",
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
                className="text-[11px]  font-bold uppercase text-white">
            {label}
            </Typography>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>{renderTabContent()}</TabsBody>
    </Tabs>
  );
};

export default TabPanels;
