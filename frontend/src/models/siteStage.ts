export interface SiteStage {
  id: number;
  siteId: number;
  stageId: number;
  statusId: number;
  name: string;
  notes: string | null;
  stageName: string;
  statusName: string;
  imageUrl: string;
  createdAt: Date;
}
