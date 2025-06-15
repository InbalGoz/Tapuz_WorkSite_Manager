import { useEffect, useState } from "react";
import SitesList from "../components/SitesList";
import TopBar from "../components/TopBar";
import { Container, Typography, Box } from "@mui/material";
import SiteCard from "../components/SiteCard";
import NewSiteForm from "../components/NewSiteForm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadAllSites } from "../features/sites/sitesSlice";
import { selectAllSites } from "../features/sites/sitesSelectors";

function Sites() {
  const sites = useAppSelector(selectAllSites);
  //לייבא את רשימת האתרים
  const activeSites = sites.filter((site) => site.isFinished);
  const inactiveSites = sites.filter((site) => !site.isFinished);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAllSites());
  }, [dispatch]);

  return (
    <>
      <TopBar />
      <Container>
        <Box>
          <SiteCard
            /*מייצג אתר חדש? */
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

        <SitesList filteredSites={inactiveSites} />
      </Container>
    </>
  );
}

export default Sites;
