import { useEffect, useState } from "react";
import axios from "axios";
import NewEmployeeForm from "../components/employees/NewEmployeeForm";
import EmployeeList from "../components/employees/EmployeesList";
import type { Employee } from "../models/employee";
import { Container, Typography } from "@mui/material";
import TopBar from "../components/TopBar";

export const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: "דניאל",
    lastName: "כהן",
    idNumber: "123456789",
    visaNumber: "VISA123",
    hasVisa: true,
    hasVehicle: true,
    isHeight: true,
    phoneNumber: "050-1234567",
    imageUrl: "/default-user.jpg", // או קישור לתמונה
    createdAt: new Date(),
  },
  {
    id: 2,
    firstName: "שרה",
    lastName: "לוי",
    idNumber: "987654321",
    visaNumber: null,
    hasVisa: false,
    hasVehicle: true,
    isHeight: false,
    phoneNumber: "052-7654321",
    imageUrl: "/default-user.jpg",
    createdAt: new Date(),
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("שגיאה בטעינת עובדים:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("שגיאה במחיקת עובד:", err);
    }
  };

  const handleEdit = (employee: Employee) => {
    // לפיתוח עתידי – פתיחת דיאלוג עריכה
    console.log("עריכה של:", employee);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <TopBar />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          ניהול עובדים
        </Typography>

        <NewEmployeeForm />

        <Typography variant="h6" mt={4} mb={2}>
          רשימת עובדים
        </Typography>

        <EmployeeList
          employees={mockEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Container>
    </>
  );
}
