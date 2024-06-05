import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  find_job,
  get_active,
  selectIsActive,
  selectIsLoading,
  verify_cv,
} from "../../../store/UserSlice";
import SpinnerLoading from "../../commons/SpinnerLoading";
import { PROVINCES } from "../../../constants/locations";
import { handlePhone } from "../../../utils/handlePhone";

function TurnOnJob() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const is_active = useSelector(selectIsActive);
  const [phone_number, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");

  const handleExtractCV = async (e) => {
    e.preventDefault();
    const actionResult = await dispatch(find_job());
    if (find_job.fulfilled.match(actionResult)) {
      setLocation(actionResult.payload.data["location"] || "");
      setPhone(actionResult.payload.data["phone_number"] || "");
      setSkills(actionResult.payload.data["skills"]);
      toast.success(actionResult.payload.message);
      setModalOpen(true);
    } else {
      toast.warning(actionResult.payload.message);
    }
  };

  const handleTurnOnJob = async (e) => {
    e.preventDefault();
    const data = { location, phone_number, skills };
    if (handlePhone(phone_number)) {
      const actionResult = await dispatch(verify_cv(data));
      if (verify_cv.fulfilled.match(actionResult)) {
        dispatch(get_active());
        toast.success(actionResult.payload.message);
        setModalOpen(false);
        navigate("/jobs/search/");
      } else {
        toast.warning(actionResult.payload.message);
      }
    } else {
      toast.warning("Incorrect phone number.");
    }
  };

  useEffect(() => {
    if (is_active) {
      navigate("/jobs/search/");
    } else {
      navigate("/jobs/turn-on/");
    }
  }, [is_active, navigate]);

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <SpinnerLoading loading={loading} />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ marginBottom: "2rem", fontWeight: "bold" }}
        >
          Find Your Dream Job
        </Typography>
        <Button
          variant="contained"
          sx={{
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            backgroundColor: "#2196f3",
            color: "#fff",
            transition: "background-color 0.3s ease",
            "&:hover": { backgroundColor: "#1976d2" },
          }}
          onClick={handleExtractCV}
        >
          Turn on job search
        </Button>
      </Container>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            width: "400px",
            margin: "auto",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "8px",
            marginTop: "10%",
          }}
        >
          <Button
            sx={{ float: "right", fontSize: "20px", marginBottom: "1rem" }}
            onClick={handleCloseModal}
          >
            X
          </Button>
          <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
            Verify Information
          </Typography>
          <form onSubmit={handleTurnOnJob}>
            <TextField
              fullWidth
              label="Phone number"
              variant="outlined"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              required
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              fullWidth
              select
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              sx={{ marginBottom: "1rem" }}
            >
              <MenuItem value="">
                <em>Select a location</em>
              </MenuItem>
              {PROVINCES.map((province) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Skills"
              variant="outlined"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
              sx={{ marginBottom: "1rem", maxWidth: "100%" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Confirm
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default TurnOnJob;
