export interface SiteStage {
  id: number;
  siteId: number;
  stageId: number;
  notes: string | null;
  imageUrl: string;
  statusId: number;
  createdAt: Date;
}
