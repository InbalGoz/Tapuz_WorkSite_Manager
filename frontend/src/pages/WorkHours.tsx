import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
} from "@mui/material";

type Employee = { id: number; name: string };
type Site = { id: number; name: string };
type TimeEntry = {
  employeeId: number;
  siteId: number;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  date: string; // YYYY-MM-DD
};

export default function TimesheetPage() {
  const [employees] = useState<Employee[]>([
    { id: 1, name: "אבי כהן" },
    { id: 2, name: "דנה לוי" },
  ]);
  const [sites] = useState<Site[]>([
    { id: 1, name: "אתר בנייה א׳" },
    { id: 2, name: "אתר ג׳" },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<number | "">("");
  const [selectedSite, setSelectedSite] = useState<number | "">("");
  const [startTime, setStartTime] = useState<string>("08:00");
  const [endTime, setEndTime] = useState<string>("17:00");
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [entries, setEntries] = useState<TimeEntry[]>([]);

  const handleAddEntry = () => {
    if (
      selectedEmployee === "" ||
      selectedSite === "" ||
      !startTime ||
      !endTime ||
      !date
    ) {
      return alert("מלאי את כל השדות, בבקשה.");
    }
    setEntries((prev) => [
      {
        employeeId: selectedEmployee,
        siteId: selectedSite,
        startTime,
        endTime,
        date,
      },
      ...prev,
    ]);
    setSelectedEmployee("");
    setSelectedSite("");
    setStartTime("08:00");
    setEndTime("17:00");
  };

  const todaysEntries = entries.filter((e) => e.date === date);

  return (
    <Box sx={{ mt: 6, px: 4, direction: "rtl" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "left" }}>
        דיווחי שעות
      </Typography>

      {/* ======== טופס דיווח בצד ימין ======== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 6,
        }}
      >
        <Box
          component="form"
          sx={{
            display: "grid",
            gap: 2,
            width: "100%",
            maxWidth: 900,
            gridTemplateColumns: {
              xs: "1fr", // מובייל: 1 עמודה
              sm: "1fr 1fr", // טאבלט: 2 עמודות
              md: "1fr 1fr 1fr", // דסקטופ: 3 עמודות
            },
          }}
        >
          {/* עובד */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="emp-label">עובד</InputLabel>
            <Select
              labelId="emp-label"
              value={selectedEmployee}
              label="עובד"
              onChange={(e) => setSelectedEmployee(e.target.value as number)}
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* אתר */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="site-label">אתר</InputLabel>
            <Select
              labelId="site-label"
              value={selectedSite}
              label="אתר"
              onChange={(e) => setSelectedSite(e.target.value as number)}
            >
              {sites.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* תאריך */}
          <FormControl variant="outlined">
            <InputLabel htmlFor="date">תאריך</InputLabel>
            <OutlinedInput
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              label="תאריך"
            />
          </FormControl>

          {/* שעת סיום */}
          <FormControl variant="outlined">
            <InputLabel htmlFor="end-time">סיום</InputLabel>
            <OutlinedInput
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              label="סיום"
            />
          </FormControl>
          {/* שעת התחלה */}
          <FormControl variant="outlined">
            <InputLabel htmlFor="start-time">התחלה</InputLabel>
            <OutlinedInput
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              label="התחלה"
            />
          </FormControl>

          {/* כפתור הוספה (יתפרס על כל העמודות) */}
          <Box
            sx={{ gridColumn: { xs: "span 1", sm: "span 2", md: "span 3" } }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{ height: 56 }}
              onClick={handleAddEntry}
            >
              הוסף דיווח
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ======== רשימת דיווחים להיום ======== */}
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 500, textAlign: "left" }}
      >
        דיווחים ל־{date}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          textAlign: "left",
        }}
      >
        {todaysEntries.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: "left" }}>
            אין דיווחים להיום.
          </Typography>
        ) : (
          todaysEntries.map((e, i) => {
            const emp = employees.find((x) => x.id === e.employeeId)!;
            const siteObj = sites.find((x) => x.id === e.siteId)!;
            return (
              <Card key={i} sx={{ p: 2, backgroundColor: "#fafafa" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {emp.name} – {siteObj.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    התחלה: {e.startTime} | סיום: {e.endTime}
                  </Typography>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>
    </Box>
  );
}
