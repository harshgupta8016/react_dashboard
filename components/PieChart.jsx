import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { mockPieData as data } from "../data/mockData";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      height={isDashboard ? "250px" : "400px"}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      gap="40px" // increased gap
    >
      {/* Pie Chart with Center Label */}
      <Box position="relative" width="200px" height="200px">
        <ResponsivePie
          data={data}
          innerRadius={0.8}
          padAngle={1}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          enableArcLinkLabels={false}
          enableArcLabels={false}
          colors={{ datum: "data.color" }}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          legends={[]} // disabling default legends
          theme={{
            labels: { text: { fill: colors.grey[100] } },
          }}
        />

        {/* Center Label */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: "translate(-50%, -50%)", textAlign: "center" }}
        >
          <Typography variant="h6" fontWeight="bold" color={colors.grey[100]}>
            Profit
          </Typography>
          <Typography variant="h5" fontWeight="bold" color={colors.grey[100]}>
            $332,219
          </Typography>
          <Typography variant="body2" color={colors.grey[400]}>
            in total
          </Typography>
        </Box>
      </Box>

      {/* Legend on the Farther Right */}
      <Box
        display="flex"
        flexDirection="column"
        gap="12px"
        ml="40px" // push the legend more right
      >
        {data.map((item) => (
          <Box key={item.id} display="flex" alignItems="center" gap="10px">
            <Box
              width="20px"
              height="12px"
              borderRadius="2px"
              sx={{ backgroundColor: item.color }}
            />
            <Typography color={colors.grey[100]} fontSize="14px">
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PieChart;
