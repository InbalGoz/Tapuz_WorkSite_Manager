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
import { loadAllStageStatuses } from "../features/stageStatuses/stageStatusesSlice";
import { selectAllStageStatuses } from "../features/stageStatuses/stageStatusesSelector";
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
import SiteStagesList from "../components/siteStages/SiteStagesList";
import NewSiteStageForm from "../components/siteStages/NewSiteStageForm";

//defult imageurl
const placeHolderPic =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuwnD_48Q_PuHtGT2ZXtOVuFl4dn8tpe1VHg&s";

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
  const [siteStageFormData, setSiteStageFormData] = useState({
    siteId: numericSiteId,
    stageId: 0,
    statusId: 0,
    notes: "",
    imageUrl: "",
  });
  const dispatch = useAppDispatch();
  const currentSite = useAppSelector(selectSelectedSite);
  const listAllStages = useAppSelector(selectAllStages);
  const listAllStatuses = useAppSelector(selectAllStageStatuses);
  const filteredSiteStages = useAppSelector(
    selectSiteStagesBySiteId(numericSiteId)
  );

  const [selectedStage, setSelectedStage] = useState<SiteStage | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(loadSiteById(numericSiteId));
    dispatch(loadAllStages());
    dispatch(loadAllStageStatuses());
    dispatch(loadAllSiteStages(numericSiteId));
  }, [dispatch]);

  const handleStageSelectChange = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    setSiteStageFormData((prev) => ({
      ...prev,
      stageId: value,
    }));
  };

  const handleStatusSelectChange = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);
    setSiteStageFormData((prev) => ({
      ...prev,
      statusId: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSiteStageFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSiteStage = async (e: React.FormEvent) => {
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
        statusId: 0,
        notes: "",
        imageUrl: "",
      });
      await dispatch(loadAllSiteStages(numericSiteId));
    } catch (err: any) {
      const errorMessage =
        err?.message?.includes("duplicate key") ||
        err?.message?.includes("already exists")
          ? "שלב זה כבר קיים באתר ולא ניתן להוסיפו שוב."
          : "אירעה שגיאה בהוספת השלב";

      showSnackbar(errorMessage, "error");
      //showSnackbar("אירעה שגיאה בהוספת השלב", "error");
    }
  };

  //handle site stages list
  const handleEditClick = (siteStage: SiteStage) => {
    setSelectedStage(siteStage); // כאן נבחר השלב!
    setEditDialogOpen(true); // נפתח הדיאלוג
  };

  const handleCloseDialog = () => {
    setSelectedStage(null);
    setEditDialogOpen(false);
  };

  const handleSaveUpdatedStage = async (updatedData: Partial<SiteStage>) => {
    if (!selectedStage) return;
    const updatedSiteStage = { ...selectedStage, ...updatedData };

    console.log("updates sitestage", updatedSiteStage);

    try {
      await dispatch(
        updateSiteStageThunk({
          siteStageData: updatedSiteStage,
        })
      ).unwrap();
      dispatch(loadAllSiteStages(numericSiteId)); // רענון רשימה
      showSnackbar("עודכן בהצלחה", "success");
    } catch {
      showSnackbar("שגיאה בעדכון", "error");
    } finally {
      setEditDialogOpen(false);
      setSelectedStage(null);
    }
  };

  const handlesSiteStageDelete = async (siteStageId: number) => {
    try {
      console.log("hekkp del");
      await dispatch(
        deleteSiteStageThunk({
          siteId: numericSiteId,
          siteStageId: siteStageId,
        })
      ).unwrap();
      showSnackbar("נמחק בהצלחה", "success");
      dispatch(loadAllSiteStages(numericSiteId));
    } catch {
      showSnackbar("שגיאה במחיקה", "error");
    }
  };

  console.log("filtersitebyid", filteredSiteStages);

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
                onChange={handleStageSelectChange}
              >
                {listAllStages?.map((stage) => (
                  <MenuItem key={stage.id} value={stage.id}>
                    {stage.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="project-status-label">סטטוס שלב</InputLabel>
              <Select
                labelId="project-status-label"
                value={siteStageFormData.statusId || ""}
                name="statusId"
                label="סטטוס שלב"
                onChange={handleStatusSelectChange}
              >
                {listAllStatuses?.map((stageSatatus) => (
                  <MenuItem key={stageSatatus.id} value={stageSatatus.id}>
                    {stageSatatus.statusName}
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
              value={siteStageFormData.imageUrl || ""}
              name="imageUrl"
              onChange={handleChange}
              fullWidth
            />

            <Button variant="contained" onClick={handleAddSiteStage}>
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

        {/* רשימת שלבים */}
        <SiteStagesList
          siteStages={filteredSiteStages}
          onOpenDialog={handleEditClick}
          onCloseDialog={handleCloseDialog}
          handelStageUpdate={handleSaveUpdatedStage}
          handleStageDelete={handlesSiteStageDelete}
        />
        {selectedStage && (
          <NewSiteStageForm
            open={editDialogOpen}
            onClose={handleCloseDialog}
            curSiteStage={selectedStage}
            statuses={listAllStatuses}
            onSave={handleSaveUpdatedStage}
          />
        )}
        {/* רשימת חומרים להוסיף */}
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SiteDetails;
