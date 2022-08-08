import { Box } from "@mui/system";
import React from "react";
import { Stack } from "@mui/material";

// import Chart from "react-apexcharts";
import Chats from "./chats";
import LineChats from "./Line-chart";
// const state = useState();
const Feed = () => {
  return (
    <Box flex={8} p={8}>
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <Chats />
        <LineChats />
      </Stack>

      {/* <Chats /> */}
    </Box>
  );
};

export default Feed;
