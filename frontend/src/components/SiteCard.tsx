import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import siteImage from "../assets/defultSite.avif";
import AddIcon from "@mui/icons-material/Add";
import type { Site } from "../models/site";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteSiteThunk } from "../features/sites/sitesSlice";
import {
  showConfirmDelete,
  showSuccessAlert,
  showErrorAlert,
} from "../features/alert/alertService";

// 2. נגדיר את הפרופס של הקומפוננטה באמצעות הממשק Site
interface SiteCardProps {
  site: Site;
  isNew?: boolean;
  onClick: () => void;
}

function SiteCard({ site, isNew = false, onClick }: SiteCardProps) {
  //כאשר מביאים נתונים מהDB לבדוק אם יש תמונה או לא, אם אין לשים תמונה ברירת מחדל
  //const isImage = true;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteSite = async () => {
    const confirm = await showConfirmDelete(
      "האם את בטוחה שברצונך למחוק את האתר?"
    );
    if (confirm.isConfirmed) {
      try {
        await dispatch(deleteSiteThunk(site.id)).unwrap();
        showSuccessAlert("האתר נמחק בהצלחה");
      } catch (err) {
        showErrorAlert("שגיאה במחיקת האתר");
      }
    }
  };

  //אופציה לכרטיס ריק/חדש
  if (isNew) {
    return (
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5" component="div" sx={{ textAlign: "right" }}>
          הוסף אתר חדש
        </Typography>

        <Card
          onClick={onClick}
          sx={{
            width: { xs: "100%", sm: 400 },
            minHeight: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            border: "2px dashed #ccc",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <AddIcon sx={{ fontSize: 60 }} />
        </Card>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* image={site.imageurl}*/}
      <CardMedia
        sx={{ height: 140 }}
        image={siteImage}
        title="site description"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {site.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secodary" }}>
          {site.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/site/${site.id}`)}>
          מידע נוסף
        </Button>
        <Button variant="outlined" size="small" onClick={handleDeleteSite}>
          מחק אתר
        </Button>
      </CardActions>
    </Card>
  );
}

export default SiteCard;
