import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "../api/axiosClient"; // Import axiosClient đã cấu hình interceptor

// Hàm gọi API Login
const loginUser = async (data) => {
  // axiosClient đã có sẵn baseURL từ file config
  const response = await axiosClient.post("/user/login", data);
  return response.data;
};

export default function Login() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  
  const navigate = useNavigate();

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // 1. Lưu Access Token & Refresh Token vào LocalStorage
      // (Refresh Token nên lưu ở HttpOnly Cookie nếu có thể, nhưng với bài tập này localStorage là OK)
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // 2. Thông báo & Chuyển hướng
      toast.success("Đăng nhập thành công!");
      navigate("/"); // Chuyển về trang Dashboard (Protected Route)
    },
    onError: (error) => {
      // Xử lý lỗi từ Backend trả về
      const msg = error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      toast.error(msg);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Đăng Nhập</h1>
          <p className="mt-2 text-sm text-gray-500">Chào mừng bạn quay trở lại!</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Input Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { 
                required: "Email là bắt buộc",
                pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
              })}
              className={`w-full p-3 border rounded-lg outline-none transition-all ${
                errors.email 
                  ? "border-red-500 focus:ring-2 focus:ring-red-200" 
                  : "border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              }`}
              placeholder="name@example.com"
            />
             {errors.email && <p className="mt-1 text-red-500 text-xs font-medium">{errors.email.message}</p>}
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              {...register("password", { 
                required: "Vui lòng nhập mật khẩu",
                minLength: { value: 6, message: "Mật khẩu phải từ 6 ký tự" } 
              })}
              className={`w-full p-3 border rounded-lg outline-none transition-all ${
                errors.password 
                  ? "border-red-500 focus:ring-2 focus:ring-red-200" 
                  : "border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              }`}
              placeholder="••••••••"
            />
             {errors.password && <p className="mt-1 text-red-500 text-xs font-medium">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={mutation.isPending}
            className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </span>
            ) : "Đăng Nhập"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="font-semibold text-green-600 hover:text-green-500 hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}