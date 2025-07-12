import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import type { WorkHours } from "../../models/workHours";

type WorkHoursCardProps = {
  workHour: WorkHours;
  //onEdit: (workHour: WorkHours) => void;
  //onDelete: (id: number) => void;
};
//{ workHour, onEdit, onDelete }: CardProps
function WorkHourCard({ workHour }: WorkHoursCardProps) {
  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">
            {workHour.emFirstName + "" + workHour.emLastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            אתר: {workHour.siteName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            תאריך: {new Date(workHour.workDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            שעות: {workHour.startTime} - {workHour.endTime}
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}
          >
            <Button
              size="small"
              // onClick={() => onEdit(workHour)}
              variant="outlined"
            >
              ערוך
            </Button>
            <Button
              size="small"
              // onClick={() => onDelete(workHour.id)}
              color="error"
              variant="outlined"
            >
              מחק
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default WorkHourCard;
