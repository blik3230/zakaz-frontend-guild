import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import MasterMind from "../../pet-projects/master-mind/MasterMind";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index} = props;

  if (value !== index) return null;

  return (
    <div
      role="tabpanel"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const PetProjectsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabIndexChange = (_e: React.SyntheticEvent, index: number) => {
    setTabIndex(index);
  };

  return <div className="PetProjectsPage" style={{height: '100%'}}>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabIndex}
        onChange={handleTabIndexChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', height: '100%' }}
      >
        <Tab label="MasterMind Game" />
        <Tab label="X Game" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        MasterMind Game
        <MasterMind/>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        Item Two
      </TabPanel>
    </Box>
  </div>
};

export default PetProjectsPage;
