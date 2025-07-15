import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { showSnackbar } from "../../features/alert/snackbarAlertSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createNewEmployeeThunk } from "../../features/employee/employeeSlice";
import type { Employee, NewEmployee } from "../../models/employee";

export default function NewEmployeeForm() {
  const dispatch = useAppDispatch();
  const [employeeForm, setemployeeForm] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    visaNumber: "",
    hasVisa: false,
    hasVehicle: false,
    phoneNumber: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    let parsedValue: any = value;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      parsedValue = e.target.checked;
    } else {
      parsedValue = value;
    }
    setemployeeForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeForm.firstName || !employeeForm.lastName) {
      dispatch(
        showSnackbar({ message: "נא למלא את כל שדות החובה", severity: "error" })
      );
      return;
    }

    try {
      await dispatch(createNewEmployeeThunk(employeeForm as NewEmployee));
      //await dispatch(loadAllWorkHours());
      //add
      /*await dispatch(
          createNewWorkHourThunk(workHourForm as NewWorkHour)
        ).unwrap();*/
      // showSuccessAlert("האתר נוצר בהצלחה!");
      dispatch(showSnackbar({ message: "עודכן בהצלחה", severity: "success" }));
      setemployeeForm({
        firstName: "",
        lastName: "",
        idNumber: "",
        visaNumber: "",
        hasVisa: false,
        hasVehicle: false,
        phoneNumber: "",
        imageUrl: "",
      });
      //onClose();
    } catch (err: any) {
      dispatch(
        showSnackbar({ message: "שגיאה ביצירת עובד חדש", severity: "error" })
      );
    }
  };

  return (
    <Card sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        הוספת עובד
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
        <TextField
          label="שם פרטי"
          name="firstName"
          value={employeeForm.firstName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="שם משפחה"
          name="lastName"
          value={employeeForm.lastName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="תעודת זהות"
          name="idNumber"
          value={employeeForm.idNumber}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="מספר ויזה"
          name="visaNumber"
          value={employeeForm.visaNumber}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="מספר טלפון"
          name="phoneNumber"
          value={employeeForm.phoneNumber}
          onChange={handleChange}
          fullWidth
        />

        <FormControlLabel
          control={
            <Checkbox
              name="hasVisa"
              checked={employeeForm.hasVisa}
              onChange={handleChange}
            />
          }
          label="יש ויזה?"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="hasVehicle"
              checked={employeeForm.hasVehicle}
              onChange={handleChange}
            />
          }
          label="יש רכב?"
        />

        <Button variant="outlined" component="label">
          העלאת תמונה
          <input
            type="file"
            accept="image/*"
            hidden
            name="image"
            onChange={handleChange}
          />
        </Button>

        <Button variant="contained" onClick={handleSubmit}>
          הוסף עובד
        </Button>
      </Box>
    </Card>
  );
}
