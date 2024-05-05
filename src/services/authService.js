import axios from "axios";

const login = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/employee/login/",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi ở đây nếu cần
    console.error("Error during login:", error);
    throw error; // Chuyển tiếp lỗi để xử lý ở nơi gọi hàm login
  }
};

const register = async (account) => {
  try {
    const response = await axios.post("employee/signup/", account);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Chuyển tiếp lỗi để xử lý ở nơi gọi hàm login
  }
};

const authService = { login, register };
export default authService;
