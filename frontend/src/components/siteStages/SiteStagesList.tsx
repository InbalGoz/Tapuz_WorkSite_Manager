import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import type { SiteStage } from "../../models/siteStage";
import SiteStageCard from "./SiteStageCard";

type SiteStageListProps = {
  siteStages: SiteStage[];
  onOpenDialog: (siteStage: SiteStage) => void;
  onCloseDialog: () => void;
  handelStageUpdate: (formUpdatedData: SiteStage) => void;
  handleStageDelete: (siteStageId: number) => void;
};

function SiteStagesList({
  siteStages,
  onOpenDialog,
  onCloseDialog,
  handelStageUpdate,
  handleStageDelete,
}: SiteStageListProps) {
  const { id } = useParams<{ id: string }>();
  const numericSiteId = Number(id);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card></Card>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {siteStages?.map((siteStage) => (
          <Box
            key={siteStage.id}
            sx={{ width: { xs: "100%", sm: "48%", md: "31%" } }}
          >
            <SiteStageCard
              siteStage={siteStage}
              onOpenDialog={() => onOpenDialog(siteStage)}
              handleStageDelete={handleStageDelete}
            />
          </Box>
        ))}
      </Box>
      {siteStages.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 4, textAlign: "center" }}
        >
          לא נמצאו שלבים להצגה.
        </Typography>
      )}
    </Container>
  );
}

export default SiteStagesList;
