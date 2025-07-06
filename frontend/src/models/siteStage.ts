export interface SiteStage {
  id: number;
  siteId: number;
  stageId: number;
  stageName: string;
  notes: string | null;
  imageUrl: string;
  createdAt: Date;
}
