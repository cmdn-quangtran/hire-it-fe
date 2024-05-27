import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { selectIsAdmin } from "../../../store/AuthSlice";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import CalendarModal from "./CalendarModal";
function MessageNav({ user }) {
  const isAdmin = useSelector(selectIsAdmin);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const handleOpenCalendarModal = () => {
    setShowCalendarModal(true);
  };

  const handleCloseCalendarModal = () => {
    setShowCalendarModal(false);
  };
  return (
    <Box display="flex" alignItems="center" mb={1} className="message-user-nav">
      <Avatar src={user?.avatar} alt="Avatar" sx={{ marginRight: 2 }} />
      <Typography variant="h6" className="nav-name-text">
        {user?.name}
      </Typography>
      {isAdmin ? (
        <Tooltip title="Schedule">
          <CalendarMonthIcon
            className="schedule-icon"
            onClick={handleOpenCalendarModal}
          />
        </Tooltip>
      ) : (
        <></>
      )}
      <Tooltip title="Option">
        <MoreHorizIcon className="more-icon" />
      </Tooltip>
      <CalendarModal
        showModal={showCalendarModal}
        handleCloseModal={handleCloseCalendarModal}
        user={user}
      />
    </Box>
  );
}

export default MessageNav;
