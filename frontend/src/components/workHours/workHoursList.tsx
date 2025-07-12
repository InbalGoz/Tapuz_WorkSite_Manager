import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import type { WorkHours } from "../../models/workHours";
import WorkHourCard from "./workHourCard";

type WorkHoursListProps = {
  workHoursList: WorkHours[];
  filteredWorkHoursList: WorkHours[];
  // onOpenDialog: (workHour: WorkHours) => void;
  // onCloseDialog: () => void;
  //handelWorkHourUpdate: (formUpdatedData: WorkHours) => void;
  //handleWorkHourDelete: (workHourId: number) => void;
};

function workHoursList({
  workHoursList,
  filteredWorkHoursList,
}: //onOpenDialog,
//onCloseDialog,
//handelWorkHourUpdate,
// handleWorkHourDelete,
WorkHoursListProps) {
  //adding the filtered workhours list func
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>עובד</TableCell>
            <TableCell>אתר</TableCell>
            <TableCell>תאריך</TableCell>
            <TableCell>שעת התחלה</TableCell>
            <TableCell>שעת סיום</TableCell>
            <TableCell align="center">פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workHoursList.map((wh) => (
            <TableRow key={wh.id}>
              <TableCell>{`${wh.emFirstName} ${wh.emLastName}`}</TableCell>
              <TableCell>{wh.siteName}</TableCell>
              <TableCell>
                {new Date(wh.workDate).toLocaleDateString("he-IL")}
              </TableCell>
              <TableCell>{wh.startTime}</TableCell>
              <TableCell>{wh.endTime}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => console.log("edit")}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => console.log("delete")}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default workHoursList;

/*
 <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card></Card>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {workHoursList?.map((workHourItem) => (
          <Box
            key={workHourItem.id}
            sx={{ width: { xs: "100%", sm: "48%", md: "31%" } }}
          >
            <WorkHourCard
              workHour={workHourItem}
              // onEdit={() => onOpenDialog(workHourItem)}
              // onDelete={handleWorkHourDelete}
            />
          </Box>
        ))}
      </Box>
      {workHoursList.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 4, textAlign: "center" }}
        >
          לא נמצאו דיווחי שעות להצגה.
        </Typography>
      )}
    </Container>
*/
