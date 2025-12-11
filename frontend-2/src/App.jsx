import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function Home() {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <div className="text-center bg-gray-100 p-20 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6">Chào mừng đến với User System</h1>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-blue-500 text-white rounded">Register</Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;