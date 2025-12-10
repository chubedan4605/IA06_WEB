import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

// Tạo instance
const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- 1. REQUEST INTERCEPTOR ---
// Tự động gắn Access Token vào mỗi request gửi đi
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy access token từ bộ nhớ
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- 2. RESPONSE INTERCEPTOR ---
// Xử lý khi Token hết hạn (Lỗi 401)
axiosClient.interceptors.response.use(
  (response) => response, // Nếu thành công thì trả về luôn
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa từng thử lại request này
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu đã thử lại để tránh vòng lặp vô hạn

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        // Gọi API để lấy token mới
        const res = await axios.post(`${baseURL}/user/refresh`, { refreshToken });
        const { accessToken } = res.data;

        // Lưu token mới
        localStorage.setItem("accessToken", accessToken);

        // Gán token mới vào header của request cũ và gọi lại
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Nếu refresh cũng lỗi (hết hạn 7 ngày) -> Logout
        console.error("Phiên đăng nhập hết hạn");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login"; // Chuyển hướng về login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;