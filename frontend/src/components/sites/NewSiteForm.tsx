//popup form
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createNewSite } from "../../features/sites/sitesSlice";
import type { Site } from "../../models/site";
import { Snackbar, Alert } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NewSiteForm({ open, onClose }: Props) {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    imageUrl: "",
    description: "",
    isFinished: false,
    //createdAt: "",
  });

  //const { name, address, imageUrl, description, isFinished } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.description) {
      // showErrorAlert("נא למלא את כל השדות החובה: שם, כתובת, תיאור");
      showSnackbar("נא למלא את כל שדות החובה", "error");
      return;
    }

    try {
      await dispatch(createNewSite(formData as Site)).unwrap();
      // showSuccessAlert("האתר נוצר בהצלחה!");
      showSnackbar("האתר נוצר בהצלחה!", "success");
      setFormData({
        name: "",
        address: "",
        imageUrl: "",
        description: "",
        isFinished: false,
      });
      onClose();
    } catch (err: any) {
      showSnackbar("אירעה שגיאה ביצירת האתר", "error");
      //showErrorAlert(err?.message || "אירעה שגיאה ביצירת האתר");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth dir="rtl">
        <DialogTitle>הוספת אתר חדש</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mt: 1,
            }}
          >
            {/* שם האתר */}
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="name">שם האתר</InputLabel>
              <OutlinedInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                label="שם האתר"
              />
            </FormControl>

            {/* כתובת */}
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="address">כתובת / מיקום</InputLabel>
              <OutlinedInput
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                label="כתובת / מיקום"
              />
            </FormControl>

            {/* קישור לתמונה */}
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="imageUrl">קישור לתמונה</InputLabel>
              <OutlinedInput
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                label="קישור לתמונה"
              />
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="description">תיאור אתר</InputLabel>
              <OutlinedInput
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                label="תיאור אתר"
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="isFinished"
                  checked={formData.isFinished}
                  onChange={handleChange}
                />
              }
              label="האתר הסתיים?"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>ביטול</Button>
          <Button onClick={handleSubmit} variant="contained">
            שמור
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
