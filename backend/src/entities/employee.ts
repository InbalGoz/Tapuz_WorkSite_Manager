export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string | null;
  visaNumber: string | null;
  hasVisa: boolean;
  hasVehicle: boolean;
  phoneNumber: string | null;
  imageUrl: string;
  isHeight: boolean;
  createdAt: Date;
}
