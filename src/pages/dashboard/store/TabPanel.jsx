
import React, { useState } from 'react';
import { Tabs, TabsHeader, Tab, TabsBody, Typography } from '@material-tailwind/react';


const TabPanels = () => {
  const [activeTab, setActiveTab] = useState('Active'); 

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
            return <h1>Active Products</h1>;

        case 'Draft':
            return <h1>Draft Products</h1>;  
        
        case 'Out of Stock':
            return <h1>Out of Stock</h1>;   
        
        case 'In Active':
            return <h1>Inactive</h1>;      
      
      default:
        return null; 
    }
  };

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

