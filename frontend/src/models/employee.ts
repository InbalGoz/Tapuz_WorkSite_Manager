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

export type NewEmployee = {
  firstName: string;
  lastName: string;
  idNumber: string;
  visaNumber: string;
  hasVisa: boolean;
  hasVehicle: boolean;
  phoneNumber: string;
  isHeight: boolean;
  imageUrl: string;
  //image - File
};
