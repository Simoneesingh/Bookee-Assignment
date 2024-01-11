import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CustomTabPanels from "./CustomTabPanels";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsContainer({ data }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-white ">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data.map((area, index) => (
            <Tab label={area} key={index} {...a11yProps(index)} />
          ))}
        </Tabs>
        <div>
          {data.map((area, index) => (
            <CustomTabPanels
              value={value}
              index={index}
              key={index}
              area={area}
            />
          ))}
        </div>
      </Box>
    </div>
  );
}
