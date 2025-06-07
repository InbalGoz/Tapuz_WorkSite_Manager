import { useState } from "react";
import SitesList from "../components/SitesList";
import TopBar from "../components/TopBar";
import { Container, Typography, Box } from "@mui/material";
import SiteCard from "../components/SiteCard";
import NewSiteForm from "../components/NewSiteForm";

const sites = [
  {
    id: 1,
    name: "אתר בנייה א׳",
    desc: "רחוב הדגמה 10, תל אביב",
    imageUrl: "",
    isFinish: true,
  },
  {
    id: 2,
    name: "אתר בנייה ב׳",
    desc: "רחוב הדגמה 20, ירושלים",
    imageUrl: "",
    isFinish: true,
  },
  {
    id: 3,
    name: "אתר בנייה ג׳",
    desc: "רחוב הדגמה 30, חיפה",
    imageUrl: "",
    isFinish: false,
  },
  {
    id: 4,
    name: "אתר בנייה ג׳",
    desc: "רחוב הדגמה 30, חיפה",
    imageUrl: "",
    isFinish: true,
  },
  {
    id: 5,
    name: "אתר בנייה ג׳",
    desc: "רחוב הדגמה 30, חיפה",
    imageUrl: "",
    isFinish: false,
  },
];
function Sites() {
  //לייבא את רשימת האתרים
  const activeSites = sites.filter((site) => site.isFinish);
  const inactiveSites = sites.filter((site) => !site.isFinish);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <TopBar />
      <Container>
        <Box>
          <SiteCard
            site={{
              id: 5,
              name: "אתר בנייה ג׳",
              desc: "רחוב הדגמה 30, חיפה",
              imageUrl: "",
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
