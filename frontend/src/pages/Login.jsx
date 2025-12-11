import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Mock login logic
    console.log(data);
    alert("Giả lập đăng nhập thành công!");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Đăng Nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register("email", { required: true })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
             {errors.email && <span className="text-red-500 text-xs">Bắt buộc</span>}
          </div>
          <div>
            <label className="block text-sm font-medium">Mật khẩu</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
             {errors.password && <span className="text-red-500 text-xs">Bắt buộc</span>}
          </div>
          <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Đăng Nhập
          </button>
        </form>
        <div className="text-center text-sm">
          Chưa có tài khoản? <Link to="/register" className="text-blue-600">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}