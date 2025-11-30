import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  // Keep state in sync with localStorage whenever the route changes
  useEffect(() => {
    const loggedInFlag = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedInFlag);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    navigate("/"); 
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/home" className="text-2xl font-bold">
        Game Tracker
      </Link>

      <div className="flex gap-4 items-center">
        {/*<Link to="/home" className="hover:text-gray-300">
          Home
        </Link>*/}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
