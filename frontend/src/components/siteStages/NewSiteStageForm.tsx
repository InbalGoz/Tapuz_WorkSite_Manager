import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { SiteStage } from "../../models/siteStage";
import type { stageStatuses } from "../../models/stageStatuses";

type Props = {
  open: boolean;
  onClose: () => void;
  curSiteStage: SiteStage;
  statuses: stageStatuses[];
  onSave: (updatedStage: Partial<SiteStage>) => void;
};

function NewSiteStageForm({
  open,
  onClose,
  curSiteStage,
  statuses,
  onSave,
}: Props) {
  const [form, setForm] = useState({
    notes: "",
    imageUrl: "",
    statusId: 0,
  });

  useEffect(() => {
    if (curSiteStage) {
      setForm({
        notes: curSiteStage.notes || "",
        imageUrl: curSiteStage.imageUrl || "",
        statusId: curSiteStage.statusId,
      });
    }
  }, [curSiteStage]);

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    setForm((prev) => ({
      ...prev,
      statusId: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>עריכת שלב</DialogTitle>
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
          <FormControl fullWidth>
            <InputLabel>סטטוס</InputLabel>
            <Select
              name="statusId"
              value={form.statusId || ""}
              onChange={handleSelectChange}
              label="סטטוס שלב"
            >
              {statuses?.map((stageSatatus) => (
                <MenuItem key={stageSatatus.id} value={stageSatatus.id}>
                  {stageSatatus.statusName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="notes"
            label="הערות"
            value={form.notes}
            onChange={handleChange}
            fullWidth
            multiline
          />

          <TextField
            name="imageUrl"
            label="קישור לתמונה"
            value={form.imageUrl}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          שמור
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewSiteStageForm;
