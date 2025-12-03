import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from "react";
// 1. Import Toaster và toast
import { Toaster, toast } from "sonner";

function Home() {
  const [user, setUser] = useState(() => {
    const loggedInUser = localStorage.getItem("user");
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    // Thay alert bằng toast
    toast.info("Đã đăng xuất thành công!");
    navigate("/login");
  };

  return (
    // 1. CONTAINER NGOÀI CÙNG:
    // - min-h-screen: Chiều cao full màn hình
    // - flex, items-center, justify-center: Căn giữa dọc và ngang
    // - bg-gray-50: Màu nền xám nhẹ để làm nổi bật cái Card màu trắng
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      
      {/* 2. CARD CHỨA NỘI DUNG:
          - w-full max-w-md: Độ rộng tối đa
          - bg-white: Nền trắng
          - shadow-2xl: Đổ bóng đậm (hoặc dùng shadow-lg)
          - rounded-2xl: Bo tròn góc
          - p-10: Padding bên trong rộng rãi
      */}
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl text-center border border-gray-100">
        
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-tight">
          Hệ thống User
        </h1>

        {user ? (
          // Giao diện khi ĐÃ ĐĂNG NHẬP
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-sm text-gray-500">Xin chào thành viên,</p>
              <h2 className="text-xl text-green-700 font-bold break-all">{user.email}</h2>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          // Giao diện khi CHƯA ĐĂNG NHẬP
          <div className="flex flex-col gap-4">
            <p className="text-gray-500 mb-2">Vui lòng đăng nhập để tiếp tục</p>
            
            <div className="flex gap-4 justify-center">
              <Link 
                to="/login" 
                className="flex-1 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer nhỏ bên dưới (tùy chọn) */}
      <p className="mt-8 text-sm text-gray-400">
        © 2025 IA03 Project Demo
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