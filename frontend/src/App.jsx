// import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axiosClient from "./api/axiosClient"; // API Client đã cấu hình Interceptor

function Home() {
  // const navigate = useNavigate();
  const hasToken = !!localStorage.getItem("accessToken");

  // --- LOGIC DATA: Dùng React Query gọi API Profile ---
  // Chỉ gọi API khi trong localStorage có token (enabled: hasToken)
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosClient.get("/user/profile");
      return response.data;
    },
    retry: false, // Không retry nếu lỗi auth
    enabled: hasToken, // Chỉ fetch khi có token
  });

  // Nếu API lỗi (Token hết hạn vĩnh viễn), coi như chưa đăng nhập
  const isAuthenticated = user && !isError;

  const handleLogout = () => {
    localStorage.clear(); // Xóa sạch Token
    toast.info("Đã đăng xuất thành công!");
    // Refresh lại trang hoặc điều hướng để reset state
    window.location.reload(); 
  };

  return (
    // 1. CONTAINER NGOÀI CÙNG (Căn giữa, nền xám)
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      
      {/* 2. CARD CHỨA NỘI DUNG (Trắng, Shadow đẹp, Bo tròn) */}
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl text-center border border-gray-100">
        
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-tight">
          Hệ thống User
        </h1>

        {/* TRƯỜNG HỢP 1: Đang tải thông tin User (khi F5 lại trang) */}
        {isLoading && hasToken && (
          <div className="py-10 flex flex-col items-center justify-center text-gray-500 space-y-3">
             <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             <p>Đang xác thực bảo mật...</p>
          </div>
        )}

        {/* TRƯỜNG HỢP 2: ĐÃ ĐĂNG NHẬP THÀNH CÔNG */}
        {!isLoading && isAuthenticated && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100 shadow-inner">
              <p className="text-sm text-gray-500">Xin chào thành viên,</p>
              <h2 className="text-xl text-green-700 font-bold break-all">{user.email}</h2>
              <p className="text-xs text-gray-400 mt-1">ID: {user._id}</p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Đăng xuất
            </button>
          </div>
        )}

        {/* TRƯỜNG HỢP 3: CHƯA ĐĂNG NHẬP (Hoặc Token lỗi/hết hạn) */}
        {!isLoading && !isAuthenticated && (
          <div className="flex flex-col gap-4 animate-fade-in-up">
            <p className="text-gray-500 mb-2">Vui lòng đăng nhập để tiếp tục</p>
            
            <div className="flex gap-4 justify-center">
              <Link 
                to="/login" 
                className="flex-1 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Register
              </Link>
            </div>
          </div>
        )}

      </div>

      <p className="mt-8 text-sm text-gray-400">
        © 2025 Secure JWT Auth System
      </p>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;