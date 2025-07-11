import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import type { SiteStage } from "../../models/siteStage";

type Props = {
  siteStage: SiteStage;
  onOpenDialog: () => void;
  handleStageDelete: (siteStageId: number) => void;
};

function SiteStageCard({ siteStage, onOpenDialog, handleStageDelete }: Props) {
  return (
    <Card sx={{ width: 280 }}>
      {siteStage.imageUrl ? (
        <CardMedia
          component="img"
          height="140"
          image={siteStage.imageUrl}
          alt={siteStage.stageName}
        />
      ) : (
        <Box
          sx={{
            height: 140,
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#999",
          }}
        >
          אין תמונה
        </Box>
      )}
      <CardContent>
        <Typography variant="h6">{siteStage.stageName}</Typography>
        <Typography variant="body2" color="text.secondary">
          סטטוס: {siteStage.statusName}
        </Typography>

        {siteStage.notes && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            הערות: {siteStage.notes}
          </Typography>
        )}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          נוצר בתאריך: {new Date(siteStage.createdAt).toLocaleDateString()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            gap: 1,
          }}
        >
          <Button
            size="small"
            /*   כאן הוא צריך לפתוח את הטוספ ולהעביר לו פונקציה שמעדכנת את שלב */
            onClick={onOpenDialog}
            variant="outlined"
          >
            ערוך
          </Button>
          <Button
            size="small"
            onClick={() => handleStageDelete(siteStage.id)}
            color="error"
            variant="outlined"
          >
            מחק
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SiteStageCard;
