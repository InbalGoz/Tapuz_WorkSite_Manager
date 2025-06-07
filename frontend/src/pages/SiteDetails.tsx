import { useState } from "react";
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
} from "@mui/material";

const site = {
  id: 1,
  name: "אתר בנייה א׳",
  desc: "רחוב הדגמה 10, תל אביב",
  imageUrl: "",
  isFinish: true,
};

function SiteDetails() {
  //const { id } = useParams(); // זה ייתן לך את ה-id מה-URL
  //לפלטר את האתר הרלוונטי מהרשימה, לבקש רשימת אתרים
  const [step, setStep] = useState("");
  const [note, setNote] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [updates, setUpdates] = useState([
    //לייבא את הרשימה לפי אתר
    {
      step: "חפירה",
      note: "בוצעה חפירה ראשונית",
      imageUrl: "",
    },
  ]);

  const handleAddUpdate = () => {
    const newUpdate = { step, note, imageUrl };
    setUpdates([newUpdate, ...updates]);
    setStep("");
    setNote("");
    setImageUrl("");
  };
  return (
    <Box sx={{ mt: 6, px: 9, direction: "rtl" }}>
      {/* כותרת */}
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 600, textAlign: "left" }}
      >
        {site.name}
      </Typography>

      {/* טופס + תמונה */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 4,
          mb: 6,
        }}
      >
        {/* טופס */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="project-step-label">שלב בפרויקט</InputLabel>
            <Select
              labelId="project-step-label"
              value={step}
              label="שלב בפרויקט"
              onChange={(e) => setStep(e.target.value)}
            >
              <MenuItem value="חפירה">חפירה</MenuItem>
              <MenuItem value="יסודות">יסודות</MenuItem>
              <MenuItem value="שלד">שלד</MenuItem>
              <MenuItem value="גמרים">גמרים</MenuItem>
              <MenuItem value="סיום">סיום</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="הערות"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="קישור לתמונה"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleAddUpdate}>
            הוסף עדכון
          </Button>
        </Box>

        {/* תמונה + מיקום מימין */}
        <Card sx={{ width: 360 }}>
          <CardMedia
            component="img"
            height="200"
            image={site.imageUrl}
            alt="תמונת אתר"
          />
          <CardContent>
            <Typography variant="subtitle1" color="text.secondary">
              מיקום: {site.desc}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* כותרת עדכונים */}
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 500, textAlign: "left" }}
      >
        עדכונים שבוצעו
      </Typography>

      {/* רשימת עדכונים */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {updates.map((u, i) => (
          <Card
            key={i}
            sx={{ p: 2, backgroundColor: "#f9f9f9", textAlign: "left" }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              שלב: {u.step}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {u.note}
            </Typography>
            {u.imageUrl && (
              <Box
                component="img"
                src={u.imageUrl}
                alt={`עדכון ${i}`}
                sx={{
                  maxWidth: "100%",
                  borderRadius: 2,
                  mt: 1,
                  boxShadow: 1,
                }}
              />
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default SiteDetails;
