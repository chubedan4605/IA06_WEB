import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient"; 
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Hàm gọi API
const registerUser = async (data) => {
  // LƯU Ý: Không cần thêm import.meta.env.VITE_API_URL ở đây nữa
  // vì axiosClient đã tự động nhận baseURL rồi.
  const response = await axiosClient.post("/user/register", data);
  return response.data;
};

export default function Register() {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // console.log(data);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập."); 
      navigate("/login");
    },
    onError: (error) => {
      const msg = error.response?.data?.message || "Đăng ký thất bại";
      toast.error(msg); 
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Card Container giống hệt Login */}
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Đăng Ký</h1>
          <p className="mt-2 text-sm text-gray-500">Tạo tài khoản mới để bắt đầu</p>
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
              // Style Input đồng bộ: viền xám, focus màu xanh dương (Blue) để phân biệt với Login (Green)
              className={`w-full p-3 border rounded-lg outline-none transition-all ${
                errors.email 
                  ? "border-red-500 focus:ring-2 focus:ring-red-200" 
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                required: "Mật khẩu là bắt buộc", 
                minLength: { value: 6, message: "Tối thiểu 6 ký tự" }
              })}
              className={`w-full p-3 border rounded-lg outline-none transition-all ${
                errors.password 
                  ? "border-red-500 focus:ring-2 focus:ring-red-200" 
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-red-500 text-xs font-medium">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                {/* SVG Loading Spinner */}
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </span>
            ) : "Đăng Ký"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}