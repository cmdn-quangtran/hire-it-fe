import React from "react";
import { Link, Outlet } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Button, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  link: {
    margin: theme.spacing(1),
    textDecoration: "none",
  },
}));

const DevideSignUp = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
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
                className={classes.link}
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
                className={classes.link}
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
