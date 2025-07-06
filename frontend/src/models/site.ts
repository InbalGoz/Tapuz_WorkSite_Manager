export interface Site {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  description: string;
  isFinished: boolean;
  createdAt: Date;
}

// הנתונים שנשלחים מהטופס לשרת (ליצירה)
export interface CreateSitePayload {
  name: string;
  address: string;
  imageUrl: string;
  description: string;
  isFinished: boolean;
}

// לעדכון – כל שדה יכול להיות חלקי
export type UpdateSitePayload = Partial<CreateSitePayload>;
