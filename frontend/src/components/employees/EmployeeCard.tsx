import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  CardActions,
  Button,
} from "@mui/material";
import type { Employee } from "../../models/employee"; // נתיב לדוגמה

interface Props {
  employee: Employee;
}

export default function EmployeeCard({ employee }: Props) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="180"
        image={employee.imageUrl || "/default-user.jpg"}
        alt={`${employee.firstName} ${employee.lastName}`}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {employee.firstName} {employee.lastName}
        </Typography>

        {employee.phoneNumber && (
          <Typography variant="body2" color="text.secondary">
            טלפון: {employee.phoneNumber}
          </Typography>
        )}

        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
          {employee.hasVisa && <Chip label="יש ויזה" color="primary" />}
          {employee.hasVehicle && <Chip label="יש רכב" color="secondary" />}
          {employee.isHeight && <Chip label="עובד בגובה" color="warning" />}
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => console.log()}>
          ערוך
        </Button>
        <Button size="small" color="error" onClick={() => console.log()}>
          מחק
        </Button>
      </CardActions>
    </Card>
  );
}
