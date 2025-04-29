import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AreaChart from "../../components/AreaChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import Calendar from "../../scenes/calendar";
import CustomHeader from "../../components/CustomHeader";
import { mockTransactions } from "../../data/mockData";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* CUSTOM HEADER */}
      <CustomHeader />

      {/* GRID START */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="minmax(80px, auto)"
        gap="10px"
      >
        {/* 4 Stat Boxes */}
        <Box
          gridColumn="span 2"
          gridRow="span 2"
          display="flex"
          flexDirection="column"
          gap="10px"
        >

          {[
            ["Total Profit", "$332,219"],
            ["Total Outage Loss", "$102.33"],
            ["Total Employees", "20"],
            ["Total no. of faults", "3286"],
          ].map(([label, value], idx) => (
            <Box
              key={idx}
              backgroundColor={colors.primary[400]}
              p="12px"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              gap="2px"
              height="calc(25% - 6px)"
              sx={{
                 borderRadius: "8px",
                boxShadow: `0 2px 8px ${theme.palette.mode === "dark" ? "#111" : "#ccc"}`,
              }}
              
            >
              <Typography variant="h4" fontWeight="bold" color={colors.greenAccent[400]}>
                {label}
              </Typography>
              <Typography variant="h4"color={colors.grey[100]}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Global Progress Area Chart */}
        <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="20px"
          display="flex"
          flexDirection="column"
          sx={{
             borderRadius: "8px",
            boxShadow: `0 2px 8px ${theme.palette.mode === "dark" ? "#111" : "#ccc"}`,
          }}
          
        >
          {/* Header: Title + Time Filters */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
            
            
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Global Progress
            </Typography>

            <Box display="flex" gap="10px">
              {["All Time", "Week", "Month", "Day"].map((period, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  fontWeight="bold"
                  color={colors.greenAccent[400]}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {period}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Chart Section */}
          <Box height="250px" width="100%">
            <AreaChart isDashboard={true} />
          </Box>
        </Box>



        {/* Global Presence Geography Chart */}
        <Box gridColumn="span 3" gridRow="span 2" backgroundColor={colors.primary[400]} p="20px"sx={{
   borderRadius: "8px",
  boxShadow: `0 2px 8px ${theme.palette.mode === "dark" ? "#111" : "#ccc"}`,
}}
>
          <Typography variant="h5" fontWeight="600" mb="50px" color={colors.grey[100]}>
            Global Presence
          </Typography>
          <Box height="140px" maxHeight="140px" overflow="hidden" mb="10px">
            <GeographyChart isDashboard={true} />
          </Box>

        </Box>

        {/* Pie Chart + Recent Transactions */}
<Box
  gridColumn="span 6"
  backgroundColor={colors.primary[400]}
  p="20px"
  display="flex"
  flexDirection="column"
  gap="20px"
  sx={{
     borderRadius: "8px",
    boxShadow: `0 2px 8px ${theme.palette.mode === "dark" ? "#111" : "#ccc"}`,
  }}
  
>

 {/* Top Row: Heading + Filter Buttons */}
 <Box display="flex" justifyContent="space-between" alignItems="center" >
  <Typography variant="h4" fontWeight="600" color={colors.grey[100]}>
    Profit (Project wise distribution)
  </Typography>

  <Box display="flex" gap="10px">
    {["All time", "Month", "Year"].map((label) => (
      <Box
        key={label}
        px="12px"
        py="6px"
        borderRadius="6px"
        bgcolor={theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[300]}
        color={theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900]}
        sx={{
          cursor: "pointer",
          fontWeight: 500,
          fontSize: "14px",
          '&:hover': {
            backgroundColor: colors.greenAccent[500],
            color: colors.grey[900],
          },
        }}
      >
        {label}
      </Box>
    ))}
  </Box>
</Box>



  {/* Bottom Row: Pie Chart and Transactions */}
  <Box display="flex" gap="20px">
    {/* Pie Chart */}
    <Box
      flex="1"
      minWidth="250px"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      
    >
      <PieChart isDashboard={true} />
    </Box>

    {/* Styled Transactions */}
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      overflow="auto"
      maxHeight="250px"
    >
      <Box mb="10px">
        <Typography variant="h4" fontWeight="600" color={colors.grey[100]}>
          Recent Transactions
        </Typography>
      </Box>

      {mockTransactions.slice(0, 5).map((transaction, i) => (
        <Box key={i} pb="10px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              fontWeight="bold"
              variant="h5"
              color={colors.redAccent[500]}
            >
              +$ {transaction.cost}
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              color={colors.grey[100]}
            >
              {transaction.user}
            </Typography>
          </Box>
          <Box
            borderBottom={`1px solid ${colors.grey[700]}`}
            mt="8px"
          />
        </Box>
      ))}
    </Box>
  </Box>
</Box>



{/* vNS Funds */}
<Box
  gridColumn="span 6"
  backgroundColor={colors.primary[400]}
  p="20px"
  display="flex"
  flexDirection="column"
  sx={{
     borderRadius: "8px",
    boxShadow: `0 2px 8px ${theme.palette.mode === "dark" ? "#111" : "#ccc"}`,
  }}
  
>
  {/* Header: Title + Fund Details */}
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mb="20px"
  >
    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
      vNS Funds
    </Typography>

    <Box display="flex" gap="20px">
      <Typography variant="h6" color={colors.greenAccent[400]}>
        Total Allocated:{" "}
        <Box component="span" fontWeight="bold" color={colors.grey[100]} display="inline">
          $32,900.50
        </Box>
      </Typography>
      <Typography variant="h6" color={colors.greenAccent[400]}>
        Remaining:{" "}
        <Box component="span" fontWeight="bold" color={colors.grey[100]} display="inline">
          $10,960
        </Box>
      </Typography>
    </Box>
  </Box>

  {/* Chart Section */}
  <Box height="240px" width="100%" p={0} m={0} overflow="hidden">
    <AreaChart isDashboard={true} />
  </Box>
</Box>


{/* Total Projects */}
<Box
  gridColumn="span 6"
  gridRow="span 2"
  backgroundColor={colors.primary[400]}
  p="20px"
  display="flex"
  flexDirection="column"
  sx={{
     borderRadius: "8px",
    boxShadow: `0 2px 8px ${theme.palette.mode === "dark" ? "#111" : "#ccc"}`,
  }}
  
>
  {/* Title and optional filter */}
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mb="20px"
  >
    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
      Total Projects
    </Typography>

    {/* Optional dropdown indicator */}
    <Typography
      variant="body2"
      fontWeight="bold"
      color={colors.greenAccent[400]}
      sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
    >
      2024 ▼
    </Typography>
  </Box>

  {/* Fixed-height Bar Chart */}
  <Box height="250px" width="100%">
    <BarChart isDashboard={true} />
  </Box>


</Box>


        {/* Events */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} p="10px" overflow="auto" display="flex" flexDirection="column"
        sx={{
           borderRadius: "8px",
          boxShadow: `0 2px 8px ${theme.palette.mode === "dark" ? "#111" : "#ccc"}`,
        }}
        >
          <Calendar isDashboard={true} showOnlySidebar={true} />
        </Box>

        {/* Mini Calendar */}
        <Box gridColumn="span 2" gridRow="span 2" backgroundColor={colors.primary[400]} p="10px"
        sx={{
           borderRadius: "8px",
          boxShadow: `0 2px 8px ${theme.palette.mode === "dark" ? "#111" : "#ccc"}`,
        }}
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb="10px">
            Calendar
          </Typography>
          <Box height="280px">
            <Calendar isDashboard={true} />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
