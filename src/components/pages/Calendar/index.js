import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { selectUserInfo } from "../../../store/UserSlice";
import {
  get_interview_by_email,
  selectIsInterviewByEmail,
  selectIsLoading,
} from "../../../store/InterviewSlice";
import SpinnerLoading from "../../commons/SpinnerLoading";
import EventList from "../Event/EventList";

const Calendar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const loading = useSelector(selectIsLoading);
  const initialEvents = useSelector(selectIsInterviewByEmail);

  const [events, setEvents] = useState(initialEvents);
  const [eventsInDay, setEventsInDay] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    document.title = "Calendar | Hire IT";
  }, []);

  useEffect(() => {
    if (userInfo) {
      const email = userInfo?.account.email;
      dispatch(get_interview_by_email({ email })).then((actionResult) => {
        if (get_interview_by_email.fulfilled.match(actionResult)) {
          setEvents(actionResult.payload.data);
        }
      });
    }
  }, [dispatch, userInfo]);

  const getEventColor = (status) => {
    const colorMap = {
      approval: "#119111",
      cancel: "#b22517",
      pending: "#c0c215",
    };
    return colorMap[status] || "#3a516f";
  };

  const updatedEvents = events.map((event) => ({
    ...event,
    title: event.employee_name,
    backgroundColor: getEventColor(event.status),
  }));

  const handleDateClick = (arg) => {
    const clickedDate = new Date(arg.date);
    clickedDate.setDate(clickedDate.getDate() + 1);
    const clickedDateString = clickedDate.toISOString().split("T")[0];

    const filteredEvents = events.filter(
      (event) => event.date === clickedDateString
    );

    setEventsInDay(filteredEvents);
    setDate(clickedDateString);
  };

  if (loading) {
    return <SpinnerLoading loading={loading} />;
  }

  return (
    <div className="calendar-container">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <h3 className="title-calendar">{date}</h3>
          {eventsInDay.length ? (
            <EventList events={eventsInDay} />
          ) : (
            <p className="no-interview-calendar">There are no interviews.</p>
          )}
        </Grid>
        <Grid item xs={9}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={updatedEvents}
            dateClick={handleDateClick}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Calendar;
