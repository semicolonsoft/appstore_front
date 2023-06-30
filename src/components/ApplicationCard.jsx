import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

import URLS from "../services/url";
import { useNavigate } from "react-router-dom";

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/application/${application.id}`);
      }}
      sx={{
        boxShadow: 1,
        borderRadius: 4,
        m: 1,
        width: "160px",
        minWidth: "160px",
        cursor: "pointer",
        ":hover": { boxShadow: 4 },
      }}
      style={{ textDecoration: "none" }}
    >
      <Box sx={{ p: 2 }}>
        <CardMedia
          component="img"
          src={URLS.MAIN + application.cover}
          alt={application.name}
          sx={{ borderRadius: 4 }}
        />
      </Box>
      <CardContent>
        <Typography variant="h6">{application.name}</Typography>
        <Typography
          variant="subtitle2"
          color={(thm) => thm.palette.text.secondary}
        >
          By: {application.developer.first_name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
