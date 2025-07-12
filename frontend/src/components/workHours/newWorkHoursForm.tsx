import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createNewWorkHourThunk,
  loadAllWorkHours,
  loadAllFilteredWorkHours,
} from "../../features/workHours/workHoursSlice";
import {
  selectAllWorkHours,
  selectAllFilterWorkHours,
} from "../../features/workHours/workHoursSelector";
import { loadAllSites } from "../../features/sites/sitesSlice";
import { selectAllSites } from "../../features/sites/sitesSelectors";
import { loadAllEmployees } from "../../features/employee/employeeSlice";
import { selectAllEmployees } from "../../features/employee/employeeSelector";
import type { NewWorkHour, WorkHours } from "../../models/workHours";
import { showSnackbar } from "../../features/alert/snackbarAlertSlice";

function newWorkHoursForm() {
  const dispatch = useAppDispatch();
  const today = new Date().toISOString().split("T")[0];
  const [workHourForm, setworkHourForm] = React.useState({
    siteId: 0,
    employeeId: 0,
    workDate: today,
    startTime: "",
    endTime: "",
    totalHoursWorked: 0,
    metersWorked: 0,
    isPaidByMeter: false,
    notes: "",
  });

  const sitesList = useAppSelector(selectAllSites);
  const employeesList = useAppSelector(selectAllEmployees);

  useEffect(() => {
    dispatch(loadAllSites());
    dispatch(loadAllEmployees());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    let parsedValue: any = value;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      parsedValue = e.target.checked;
    } else if (name === "totalHoursWorked" || name === "metersWorked") {
      parsedValue = Number(value);
    } else if (name === "workDate") {
      parsedValue = value; // או new Date(value) אם ה־DB דורש Date
    } else if (name === "startTime" || name === "endTime") {
      parsedValue = value; // מחרוזת "HH:MM"
    }
    setworkHourForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSitesSelectChange = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    setworkHourForm((prev) => ({
      ...prev,
      siteId: value,
    }));
  };

  const handleEmployeesSelectChange = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    setworkHourForm((prev) => ({
      ...prev,
      employeeId: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !workHourForm.workDate ||
      !workHourForm.employeeId ||
      !workHourForm.startTime ||
      !workHourForm.endTime ||
      !workHourForm.isPaidByMeter ||
      !workHourForm.siteId
    ) {
      dispatch(
        showSnackbar({ message: "נא למלא את כל שדות החובה", severity: "error" })
      );
      return;
    }

    try {
      await dispatch(
        createNewWorkHourThunk({
          ...workHourForm,
          workDate: new Date(workHourForm.workDate), // המרה חשובה כאן
        })
      );
      await dispatch(loadAllWorkHours());
      //add
      /*await dispatch(
        createNewWorkHourThunk(workHourForm as NewWorkHour)
      ).unwrap();*/
      // showSuccessAlert("האתר נוצר בהצלחה!");
      dispatch(showSnackbar({ message: "עודכן בהצלחה", severity: "success" }));
      setworkHourForm({
        siteId: 0,
        employeeId: 0,
        workDate: today,
        startTime: "",
        endTime: "",
        totalHoursWorked: 0,
        metersWorked: 0,
        isPaidByMeter: false,
        notes: "",
      });
      //onClose();
    } catch (err: any) {
      dispatch(
        showSnackbar({ message: "שגיאה ביצירת הדיווח שעות", severity: "error" })
      );
      //showErrorAlert(err?.message || "אירעה שגיאה ביצירת האתר");
    }
  };
  return (
    <>
      {/* טופס הוספה */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          הוספת דיווח
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
            width: "100%",
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <InputLabel id="site-label">אתר</InputLabel>
            <Select
              labelId="site-label"
              name="siteId"
              value={workHourForm.siteId || ""}
              label="אתר"
              onChange={handleSitesSelectChange}
            >
              {sitesList.map((site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="employee-label">עובד</InputLabel>
            <Select
              labelId="employee-label"
              name="employeeId"
              value={workHourForm.employeeId || ""}
              label="עובד"
              onChange={handleEmployeesSelectChange}
            >
              {employeesList.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.firstName + " " + emp.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="date"
            label="תאריך"
            name="workDate"
            value={workHourForm.workDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            type="time"
            label="שעת התחלה"
            name="startTime"
            value={workHourForm.startTime}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            type="time"
            label="שעת סיום"
            name="endTime"
            value={workHourForm.endTime}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            type="number"
            label="סה''כ שעות עבודה"
            name="totalHoursWorked"
            value={workHourForm.totalHoursWorked}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            type="number"
            label="מטרים שבוצעו"
            name="metersWorked"
            value={workHourForm.metersWorked}
            onChange={handleChange}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                name="isPaidByMeter"
                checked={workHourForm.isPaidByMeter}
                onChange={handleChange}
              />
            }
            label="שולם לפי מטר?"
          />

          <TextField
            label="הערות"
            value={workHourForm.notes}
            name="notes"
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <Button variant="contained" onClick={handleSubmit}>
            הוסף דיווח
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default newWorkHoursForm;
