import React from "react";
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const users = [
  {
    title: "Common People",
    description: "Individuals can properly dispose of e-waste through our platform.",
    image: "/assets/common-people.jpg",  // Public folder reference
  },
  {
    title: "Municipality Center",
    description: "Municipality centers collect and categorize e-waste before forwarding it.",
    image: "/assets/municipality-center.jpg",
  },
  {
    title: "Recyclers / Dismantlers",
    description: "Specialized recyclers dismantle and process e-waste for reuse.",
    image: "/assets/recycler-plant.png",
  },
  {
    title: "Government Authorities",
    description: "Regulatory bodies ensure compliance and oversee the e-waste flow.",
    image: "/assets/government-authorities.png",
  },
];

const About = () => {
  return (
    <Box id="about-section" sx={{ py: 8, textAlign: "center", backgroundColor: "#f4f4f4" }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          How E-Waste is Tracked
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Our platform efficiently tracks e-waste movement from municipality centers to recyclers and government authorities.
        </Typography>

        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">Municipality Collection Center</Typography>
              <Typography>Waste is collected and sorted at designated centers.</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">Recycler / Dismantler</Typography>
              <Typography>Collected e-waste is dismantled and categorized for recycling.</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success" />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">Government Authorities</Typography>
              <Typography>Regulatory bodies oversee compliance and environmental impact.</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Container>

      {/* Floating Boxes Section */}
      <Box sx={{ mt: 6, py: 6, backgroundColor: "#ffffff" }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Who Uses Our Platform?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {users.map((user, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={user.image}
                    alt={user.title}
                    sx={{
                      width: "100%",
                      height: "180px",
                      objectFit: "contain",
                      padding: "10px",
                      backgroundColor: "#f9f9f9",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {user.title}
                    </Typography>
                    <Typography variant="body2">{user.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
