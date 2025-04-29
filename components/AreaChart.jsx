// src/components/AreaChart.jsx
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { staticAreaData } from "../data/mockData";

const AreaChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={[
        {
          id: "japan",
          color: colors.greenAccent[500], // dynamic color from theme
          data: staticAreaData,
        },
      ]}
      theme={{
        axis: {
          domain: { line: { stroke: "none" } },
          ticks: {
            line: { stroke: "none" },
            text: { fill: colors.grey[100] },
          },
          legend: { text: { fill: colors.grey[100] } },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
            fontSize: 12,
          },
        },
      }}
      colors={{ datum: "color" }}
      margin={{ top: 10, right: 5, bottom: 20, left: 50 }}
      
      xScale={{ type: "band", round: true, padding: 0.1 }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      curve="linear"
      areaBaselineValue={0}
      areaOpacity={0.8}
      enableArea={true}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: staticAreaData.filter((_, i) => i % 8 === 0).map(d => d.x),
        legend: isDashboard ? undefined : "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: [0, 200, 400, 600, 800, 1000, 1200],
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      
      enableGridX={false}
      enableGridY={true}
      gridYValues={[0 ,200, 400, 600, 800, 1000]}
      pointSize={0}
      enablePoints={false}
      enableSlices="x"
      useMesh={false}
    />
  );
};

export default AreaChart;
