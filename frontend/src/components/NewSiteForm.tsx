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
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NewSiteForm({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSave = () => {
    const newSite = { name, address, imageUrl };
    console.log("Site created:", newSite);
    // כאן אפשר לשלוח לשרת או לעדכן state חיצוני
    onClose();
  };

  return (
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="שם האתר"
            />
          </FormControl>

          {/* כתובת */}
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="address">כתובת / מיקום</InputLabel>
            <OutlinedInput
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="כתובת / מיקום"
            />
          </FormControl>

          {/* קישור לתמונה */}
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="image-url">קישור לתמונה</InputLabel>
            <OutlinedInput
              id="image-url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              label="קישור לתמונה"
            />
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>ביטול</Button>
        <Button onClick={handleSave} variant="contained">
          שמור
        </Button>
      </DialogActions>
    </Dialog>
  );
}
