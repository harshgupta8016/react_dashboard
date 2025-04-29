import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      style={{
        borderRadius: "16px", // ✅ Round the outside div
        overflow: "hidden",   // ✅ Clip everything inside
        width: "100%",
        height: "100%",
        backgroundColor: colors.primary[400], // Optional background
        position: "relative",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveBar
          data={data}
          keys={["Completed", "In Progress", "Lagging"]}
          indexBy="month"
          margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
          padding={0.4}
          groupMode="stacked"
          valueScale={{ type: "linear", min: 0, max: 25 }}
          indexScale={{ type: "band", round: true }}
          borderRadius={0} // Bars stay sharp

          colors={({ id }) => {
            if (id === "Completed") return "#003f5c";
            if (id === "In Progress") return "#ffa600";
            if (id === "Lagging") return "#ff6361";
            return "#ccc";
          }}

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

          enableGridY={true}
          enableGridX={false}
          gridYValues={[0, 5, 10, 15, 20, 25]}

          axisTop={null}
          axisRight={null}

          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "Month",
            legendPosition: "middle",
            legendOffset: 32,
          }}

          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: [0, 5, 10, 15, 20, 25],
            legend: isDashboard ? undefined : "Project Count",
            legendPosition: "middle",
            legendOffset: -40,
          }}

          enableLabel={false}

          legends={[
            {
              dataFrom: "keys",
              anchor: "right",
              direction: "column",
              translateX: 120,
              translateY: 0,
              itemsSpacing: 8,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              symbolSize: 18,
              itemOpacity: 0.85,
              itemBorderColor: "#000000",   // ✅ black border
              itemBorderWidth: 1,           // ✅ 1px thickness
              effects: [{ on: "hover", style: { itemOpacity: 1 } }],
            },
          ]}
          

          role="application"
          barAriaLabel={e =>
            `${e.id}: ${e.formattedValue} in month: ${e.indexValue}`
          }
        />
      </div>
    </div>
  );
};

export default BarChart;
