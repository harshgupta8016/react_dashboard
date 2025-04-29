import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Calendar = ({ isDashboard = false, showOnlySidebar = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const calendarRef = useRef(null);

  const [currentEvents, setCurrentEvents] = useState([
    { id: "1", title: "Meeting with CEO", start: new Date() },
    { id: "2", title: "Submit Report", start: new Date() },
    { id: "3", title: "Client Call", start: new Date() },
  ]);

  const [monthYear, setMonthYear] = useState({ month: "", year: "" });

  const updateMonthYear = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const date = calendarApi.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      setMonthYear({ month, year });
    }
  };

  useEffect(() => {
    // Wait a tiny bit to ensure FullCalendar has initialized
    setTimeout(updateMonthYear, 100);
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete '${selected.event.title}'`)) {
      selected.event.remove();
    }
  };

  const handlePrevYear = () => {
    const calendarApi = calendarRef.current.getApi();
    const date = calendarApi.getDate();
    date.setFullYear(date.getFullYear() - 1);
    calendarApi.gotoDate(date);
    updateMonthYear();
  };

  const handleNextYear = () => {
    const calendarApi = calendarRef.current.getApi();
    const date = calendarApi.getDate();
    date.setFullYear(date.getFullYear() + 1);
    calendarApi.gotoDate(date);
    updateMonthYear();
  };

  const handlePrevMonth = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    updateMonthYear();
  };

  const handleNextMonth = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    updateMonthYear();
  };

  return (
    <Box m={isDashboard || showOnlySidebar ? "0" : "20px"}>
      {/* Header only if not dashboard */}
      {!isDashboard && !showOnlySidebar && (
        <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      )}

      {/* Event Sidebar */}
      {showOnlySidebar ? (
        <Box backgroundColor={colors.primary[400]} p="20px" borderRadius="8px" height="100%" overflow="auto">
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Events
          </Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "8px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  primaryTypographyProps={{ color: "white", fontWeight: "bold" }}
                  secondary={
                    <Typography color="white" variant="body2">
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Box
          display="block"
          sx={{
            "& .fc-toolbar-title": {
              fontSize: isDashboard ? "14px" : "24px",
            },
            "& .fc-button": {
              fontSize: isDashboard ? "10px" : "14px",
              padding: isDashboard ? "2px 6px" : "6px 12px",
              height: isDashboard ? "24px" : "auto",
            },
            "& .fc-toolbar.fc-header-toolbar": {
              marginBottom: isDashboard ? "5px" : "20px",
            },
            "& .fc-col-header-cell-cushion": {
              fontSize: isDashboard ? "10px" : "inherit",
            },
          }}
        >
          {/* Custom month/year nav for dashboard */}
          {isDashboard && (
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="10px">
              {/* Year Controls */}
              <Box display="flex" alignItems="center" gap="5px">
                <IconButton size="small" onClick={handlePrevYear}>
                  <NavigateBeforeIcon />
                </IconButton>
                <Typography variant="h6" color="white">{monthYear.year}</Typography>
                <IconButton size="small" onClick={handleNextYear}>
                  <NavigateNextIcon />
                </IconButton>
              </Box>

              {/* Month Controls */}
              <Box display="flex" alignItems="center" gap="5px">
                <IconButton size="small" onClick={handlePrevMonth}>
                  <NavigateBeforeIcon />
                </IconButton>
                <Typography variant="h6" color="white">{monthYear.month}</Typography>
                <IconButton size="small" onClick={handleNextMonth}>
                  <NavigateNextIcon />
                </IconButton>
              </Box>
            </Box>
          )}

          {/* Calendar */}
          <FullCalendar
            ref={calendarRef}
            height={isDashboard ? "250px" : "75vh"}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={
              isDashboard
                ? false
                : {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                  }
            }
            initialView="dayGridMonth"
            editable={!isDashboard}
            selectable={!isDashboard}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            themeSystem="standard"
            eventDisplay="block"
            dayHeaderFormat={{ weekday: isDashboard ? "short" : "long" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Calendar;
