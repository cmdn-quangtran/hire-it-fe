import React from "react";
import { Paper, Typography } from "@mui/material";

function EventItem({ event }) {
  return (
    <div
      key={event.interview_id}
      className={`event-item ${
        event.status === "pending"
          ? "event-item-pending"
          : "event-item-approval"
      }`}
    >
      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Typography variant="h6" gutterBottom>
          {event.title}
        </Typography>
        <Typography variant="body1">
          Interview: {event.employee_name}
        </Typography>
        <Typography variant="body2">
          Start Time: {event.hour_start.toString().padStart(2, "0")}:
          {event.minute_start.toString().padStart(2, "0")}
        </Typography>
        <Typography variant="body2">
          End Time: {event.hour_end.toString().padStart(2, "0")}:
          {event.minute_end.toString().padStart(2, "0")}
        </Typography>
      </Paper>
    </div>
  );
}
export default EventItem;
