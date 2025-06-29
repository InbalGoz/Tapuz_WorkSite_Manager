export interface WorkHours {
  id: Number;
  employeeId: number;
  workDate: Date;
  isPaidByMeter: boolean;
  totalHoursWorked: number;
  metersWorked: number;
  startTime: string;
  endTime: string;
  notes: string;
  siteId: number;
  createdAt: Date;
}

export interface WorkHoursFilter {
  employeeId?: number;
  siteId?: number;
  month?: string; // פורמט 'YYYY-MM'
}
