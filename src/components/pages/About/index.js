import * as React from "react";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const AboutContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2),
}));

const Paragraph = styled("p")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Avatar = styled("div")(({ theme }) => ({
  width: theme.spacing(30),
  height: theme.spacing(30),
  border: "4px solid #fff",
  boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.15)",
}));

const Root = styled("div")({
  flexGrow: 1,
});

const Cap = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

function MyComponent() {
  return (
    <Root>
      <AboutContainer>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Avatar />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Hello, I'm John Doe</Typography>
            <Paragraph>
              I'm a full-stack developer specialized in building high-quality
              websites and applications.
            </Paragraph>
            <Cap src="cap.jpg" alt="Cap" />
          </Grid>
        </Grid>
      </AboutContainer>
    </Root>
  );
}

export default MyComponent;
