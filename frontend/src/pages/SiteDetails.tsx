import { useState, useEffect } from "react";
import type { SelectChangeEvent } from "@mui/material";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadSiteById } from "../features/sites/sitesSlice";
import { selectSelectedSite } from "../features/sites/sitesSelectors";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { loadAllStages } from "../features/stages/stageSlice";
import { selectAllStages } from "../features/stages/stageSelector";
import {
  selectAllSitesStages,
  selectSiteStagesBySiteId,
} from "../features/siteStages/siteStagesSelector";
import {
  loadAllSiteStages,
  deleteSiteStageThunk,
  updateSiteStageThunk,
  createNewSiteStage,
} from "../features/siteStages/siteStagesSlice";
import type { SiteStage } from "../models/siteStage";
import { Snackbar, Alert } from "@mui/material";
import defultImage from "../assets/defultSite.avif";

const site = {
  id: 1,
  name: "אתר בנייה א׳",
  desc: "רחוב הדגמה 10, תל אביב",
  imageUrl: "",
  isFinish: true,
};

function SiteDetails() {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };
  const { id } = useParams<{ id: string }>();
  const numericSiteId = Number(id);
  const dispatch = useAppDispatch();
  const currentSite = useAppSelector(selectSelectedSite);
  const listAllStages = useAppSelector(selectAllStages);
  //1.4 get the stages but with a filter by id
  const filteredSiteStages = useAppSelector(
    selectSiteStagesBySiteId(numericSiteId)
  );

  const [siteStageFormData, setSiteStageFormData] = useState({
    siteId: numericSiteId,
    stageId: 0,
    notes: "",
    imageUrl: "",
  });

  useEffect(() => {
    dispatch(loadSiteById(numericSiteId));
    dispatch(loadAllStages());
    dispatch(loadAllSiteStages(numericSiteId));
  }, [dispatch]);

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    setSiteStageFormData((prev) => ({
      ...prev,
      stageId: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSiteStageFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteStageFormData.stageId || !siteStageFormData.notes) {
      showSnackbar("נא למלא את כל שדות החובה", "error");
      return;
    }
    try {
      await dispatch(
        createNewSiteStage(siteStageFormData as SiteStage)
      ).unwrap();
      showSnackbar("העדכון התווסף בהצלחה", "success");
      setSiteStageFormData({
        siteId: numericSiteId,
        stageId: 0,
        notes: "",
        imageUrl: "",
      });
    } catch (err: any) {
      showSnackbar("אירעה שגיאה בהוספת השלב", "error");
    }
  };

  //maxWidth="lg"
  return (
    <>
      <TopBar />
      <Container maxWidth="xl" sx={{ mt: 6 }} dir="rtl">
        {/* כותרת האתר */}
        {currentSite && (
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 600,
              textAlign: { xs: "left", md: "center" },
            }}
          >
            {currentSite?.name}
          </Typography>
        )}

        {/* טופס עדכון + תמונה */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 4,
            mb: 5,
          }}
        >
          {/* טופס */}
          <Box
            component="form"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              maxWidth: 500,
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <InputLabel id="project-step-label">שלב בפרויקט</InputLabel>
              <Select
                labelId="project-step-label"
                value={siteStageFormData.stageId || ""}
                name="stageId"
                label="שלב בפרויקט"
                onChange={handleSelectChange}
              >
                {listAllStages?.map((stage) => (
                  <MenuItem key={stage.id} value={stage.id}>
                    {stage.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="הערות"
              value={siteStageFormData.notes}
              name="notes"
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />

            <TextField
              label="קישור לתמונה"
              value={siteStageFormData.imageUrl}
              name="imageUrl"
              onChange={handleChange}
              fullWidth
            />

            <Button variant="contained" onClick={handleAddUpdate}>
              הוסף עדכון
            </Button>
          </Box>

          {/* כרטיס אתר */}
          <Card
            sx={{
              width: { xs: "100%", md: 360 },
              flexShrink: 0,
              alignSelf: "flex-start",
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={
                currentSite?.imageUrl && currentSite.imageUrl.startsWith("http")
                  ? currentSite.imageUrl
                  : defultImage
              }
              alt="תמונת אתר"
            />
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                מיקום: {currentSite?.address}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* כותרת עדכונים */}
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 500,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          עדכונים שבוצעו
        </Typography>

        {/* רשימת עדכונים */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
          }}
        >
          {filteredSiteStages.length == 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              לא קיימים שלבים לאתר זה.
            </Typography>
          ) : (
            filteredSiteStages?.map((sStage, id) => (
              <Card
                key={id}
                sx={{ p: 2, backgroundColor: "#f9f9f9", width: 600 }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  שלב: {sStage.stageName}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {sStage.notes}
                </Typography>
                {sStage.imageUrl && (
                  <Box
                    component="img"
                    src={sStage.imageUrl}
                    alt={`עדכון ${id}`}
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                      mt: 1,
                      boxShadow: 1,
                    }}
                  />
                )}
              </Card>
            ))
          )}
        </Box>
      </Container>
    </>
  );
}

export default SiteDetails;
