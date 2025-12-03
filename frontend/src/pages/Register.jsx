import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const registerUser = async (data) => {
  const response = await axios.post("http://localhost:3000/user/register", data);
  return response.data;
};

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data);
      alert("Đăng ký thành công! Chuyển sang trang login.");
      navigate("/login");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Đăng ký thất bại");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Đăng Ký</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email", { 
                required: "Email là bắt buộc", 
                pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              {...register("password", { 
                required: "Mật khẩu là bắt buộc", 
                minLength: { value: 6, message: "Tối thiểu 6 ký tự" }
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {mutation.isPending ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>
        <div className="text-center text-sm">
          Đã có tài khoản? <Link to="/login" className="text-blue-600">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}