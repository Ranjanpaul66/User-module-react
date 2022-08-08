import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Feed from "../components/Dashboard/Feed";
import ResponsiveAppBar from "../components/Shared/ResponsiveAppBar";
import Sidebar from "../components/Shared/Sidebar";

const Dashboard = () => {
  return (
    <Box>
      <ResponsiveAppBar />
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <Sidebar />
        <Feed />
      </Stack>
    </Box>
  );
};

export default Dashboard;
