import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="font-medium">Welcome, Admin</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;