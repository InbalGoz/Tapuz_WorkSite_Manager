import { Box } from "@mui/material";
import EmployeeCard from "./EmployeeCard";
import type { Employee } from "../../models/employee";

interface Props {
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: number) => void;
}

export default function EmployeeList({ employees, onEdit, onDelete }: Props) {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
      {employees.map((employee) => (
        <Box key={employee.id} flex="1 1 300px" maxWidth="300px">
          <EmployeeCard
            employee={employee}
            //onEdit={onEdit}
            //onDelete={onDelete}
          />
        </Box>
      ))}
    </Box>
  );
}
