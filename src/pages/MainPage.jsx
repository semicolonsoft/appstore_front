import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ApplicationCard from "../components/ApplicationCard";
import { Link } from "react-router-dom";
import apis from "../services/api";

function MainPage() {
  const [applications, setApplications] = useState([
    {
      id: null,
      name: "",
      description: "",
      developer: {
        image: null,
        first_name: "",
        last_name: "",
      },
      cover: "",
      file: "",
      is_active: true,
      created_at: "",
      updated_at: "",
    },
  ]);
  useEffect(() => {
    apis.applications().then((applications) => {
      setApplications(applications);
    });
  }, []);
  // Sample application data

  return (
    <Container maxWidth="md">
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <img
          src="/images/banner_1.png"
          alt="Banner 2"
          style={{ maxWidth: "100%", borderRadius: "32px" }}
        />
      </div>
      <Typography variant="h4" gutterBottom>
        New Apps
      </Typography>

      <Stack direction={"row"} justifyContent={"center"} overflow={"auto"}>
        {applications
          .filter(
            (app) => new Date() - new Date(app.created_at) < 6 * 3600 * 1000,
          )
          .map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
      </Stack>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <img
          src="/images/banner_2.jpeg"
          alt="Banner 2"
          style={{ maxWidth: "100%", borderRadius: "32px" }}
        />
      </div>
      <Typography variant="h4" gutterBottom>
        All Apps
      </Typography>
      <Stack direction={"row"} justifyContent={"center"} overflow={"auto"}>
        {applications.map((app) => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </Stack>
    </Container>
  );
}

export default MainPage;
