import { useEffect, useState } from "react";
import SitesList from "../components/sites/SitesList";
import TopBar from "../components/TopBar";
import { Container, Typography, Box } from "@mui/material";
import SiteCard from "../components/sites/SiteCard";
import NewSiteForm from "../components/sites/NewSiteForm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadAllSites } from "../features/sites/sitesSlice";
import {
  //selectAllSites,
  selectActiveSites,
  selectFinishedSites,
} from "../features/sites/sitesSelectors";

function Sites() {
  const activeSites = useAppSelector(selectActiveSites);
  const finishedSites = useAppSelector(selectFinishedSites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAllSites());
  }, [dispatch]);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <TopBar />
      <Container>
        <Box>
          <SiteCard
            /*אתר מדומה בשביל בשביל הכרטיס */
            site={{
              id: 5,
              name: "אתר בנייה ג׳",
              address: "string",
              imageUrl: "",
              description: "רחוב הדגמה 30, חיפה",
              isFinished: false,
              createdAt: new Date(),
            }}
            isNew={true}
            onClick={() => setDialogOpen(true)}
          />
          <NewSiteForm open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1, // ריווח מתחת לכותרת
            mt: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            פרוייקטים פעילים
          </Typography>
          <Box
            sx={{
              flexGrow: 1, // יתפוס את כל הרוחב הפנוי מימין לכותרת ויתפזר שמאלה
              height: 3, // עובי הקו
              backgroundColor: "primary.main", // צבע הקו (כחול MUI ראשי)
              marginRight: 3, // ריווח קטן בין הכותרת לקו
            }}
          />
        </Box>
        <SitesList filteredSites={activeSites} />
      </Container>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            mt: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            פרוייקטים היסטוריה
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              height: 3,
              backgroundColor: "primary.main",
              marginRight: 3,
            }}
          />
        </Box>

        <SitesList filteredSites={finishedSites} />
      </Container>
    </>
  );
}

export default Sites;
