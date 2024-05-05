import axios from "axios";

const get_information = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/user/get-information/"
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const userService = {
  get_information,
};
export default userService;
