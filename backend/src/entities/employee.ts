export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string | null;
  visaNumber: string | null;
  hasVisa: boolean;
  hasVehicle: boolean;
  phoneNumber: string | null;
  createdAt: Date;
}
