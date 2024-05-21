import React from "react";
import { Button, Link, Avatar, Typography, Box } from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

function MessageLink({ message, align }) {
  const containerClass =
    align === "left"
      ? "messageitem_container_left"
      : "messageitem_container_right";

  const utils = (timestamp) => {
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return hours + ":" + minutes + ", " + day + "/" + month + "/" + year;
  };
  console.log("object", message.message);
  return (
    <Box className="messageitem_container btn_infor" mb={1}>
      {align === "left" ? (
        <Avatar src={message.avatar} alt={message.name} />
      ) : (
        <Box flex="0 0 40px" />
      )}
      <div className={`${containerClass}`}>
        <Box ml={align === "left" ? 2 : "auto"}>
          <Link
            href={message.message.link_access}
            target="_blank"
            rel="noopener"
          >
            <Button
              variant="contained"
              color="primary"
              className="button-information"
              startIcon={<PictureAsPdfOutlinedIcon />}
            >
              <Typography variant="body1">{message.message.title}</Typography>
            </Button>
          </Link>
        </Box>
        <Typography
          variant="caption"
          color="textSecondary"
          className="timestamp"
        >
          {utils(message.timestamp)}
        </Typography>
      </div>
    </Box>
  );
}

export default MessageLink;
