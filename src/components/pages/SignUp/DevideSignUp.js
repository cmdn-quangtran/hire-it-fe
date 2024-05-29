import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

const DevideSignUp = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://media.foundit.in/career-advice/wp-content/uploads/2022/03/interview-question-and-answer-for-hr-recruiter.jpg"
              title="Recruiter"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Recruiter
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your Recruitment Journey Starts Here
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/register/recruiter"
                variant="contained"
                color="info"
                size="large"
                sx={{ margin: 1, textDecoration: "none" }}
              >
                Recruiter
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMwevJOE38CILZSwlQ8ucZCqEZVTpHxoKUgCEgPIO5TQ&s"
              title="Candidate"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Candidate
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Find Your Perfect Fit: Be a Candidate
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/register/candidate"
                variant="contained"
                color="info"
                size="large"
                sx={{ margin: 1, textDecoration: "none" }}
              >
                Candidate
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DevideSignUp;
