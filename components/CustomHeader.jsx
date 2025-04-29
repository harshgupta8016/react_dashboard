import { Box, Typography, useTheme, IconButton } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsIcon from "@mui/icons-material/Notifications";
import userImage from "./user.png"; // ✅ Correct: user.png inside components folder
import { tokens } from "../theme"; // adjust if needed

const CustomHeader = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      p="16px"
      mb="20px"
      //borderRadius="px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: colors.primary[400],
        boxShadow: `0 2px 8px ${theme.palette.mode === "dark" ? "#111" : "#ccc"}`,
      }}
    >
      {/* LEFT SIDE: Welcome + Name + Last Update */}
      <Box display="flex" alignItems="center" gap="14px">
        <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[400]}>
          Welcome
        </Typography>

        <Typography
          variant="h4"
          
          sx={{
            color: theme.palette.mode === "dark" ? colors.grey[100] : "#000",
            fontSize: { xs: "18px", sm: "24px" },
          }}
        >
          Mr. Mark Woodkin!
        </Typography>


        <Box display="flex" alignItems="center" gap="6px" ml="8px">
          <UpdateIcon sx={{ fontSize: "22px", color: colors.grey[400] }} />
          <Typography variant="subtitle2" color={colors.grey[400]}>
            Last Update: 10:22 AM
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE: Icons + Avatar */}
      <Box display="flex" alignItems="center" gap="16px">
        {/* Calendar Icon */}
        <IconButton
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? colors.primary[600] : colors.blueAccent[700],
            p: "6px",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.blueAccent[600],
            },
          }}
        >
          <CalendarMonthIcon sx={{ color: colors.grey[100] }} />
        </IconButton>

        {/* Notification Icon */}
        <IconButton
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? colors.primary[600] : colors.blueAccent[700],
            p: "6px",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.blueAccent[600],
            },
          }}
        >
          <NotificationsIcon sx={{ color: colors.grey[100] }} />
        </IconButton>

        {/* User Avatar */}
        <Box
          width="40px"
          height="40px"
          borderRadius="50%"
          overflow="hidden"
          border={`2px solid ${colors.greenAccent[400]}`}
        >
          <img
            src={userImage}
            alt="User"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomHeader;
