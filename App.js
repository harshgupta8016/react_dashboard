import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./scenes/global/Sidebar"; // 
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Area from "./scenes/area";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar"


function App() {
  const [theme, colorMode] = useMode();

  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className = "content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/Contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/area" element={<Area />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </main>
      </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
