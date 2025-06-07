import { Container, Typography, Box, Card } from "@mui/material";
import SiteCard from "./SiteCard";
import type { Site } from "./SiteCard"; //כשמייבאים טיפוסים צריך להגיד שזה TYPE
//import siteImage from "../assets/defultSite.avif";

interface SitesListProps {
  filteredSites: Site[];
}

function SitesList({ filteredSites }: SitesListProps) {
  //סינון לפרוייקטים שהם בביצוע וכאלה שנגמרו
  //const [loading, setLoading] = useState<boolean>(true);

  /*if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }*/

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
        {filteredSites.map((site) => (
          <Box
            key={site.id}
            sx={{ width: { xs: "100%", sm: "48%", md: "31%" } }}
          >
            <SiteCard site={site} onClick={() => ""} />
          </Box>
        ))}
      </Box>
      {filteredSites.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 4, textAlign: "center" }}
        >
          לא נמצאו אתרים להצגה.
        </Typography>
      )}
    </Container>
  );
}

export default SitesList;
