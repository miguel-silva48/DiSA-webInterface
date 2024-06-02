import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "/DiSA_logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const isLoggedIn = sessionStorage.getItem("access_token") !== null;

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("access_token");
      navigate("/");
    }
  }

  return (
    <nav className="navbar bg-transparent w-full grid grid-cols-3 items-center p-2 top-0 gap-4 justify-between">
      <Link to="/">
        <img src={logo} className="max-h-20 pl-5" alt="DiSA HomePage" />
      </Link>
      <div className="w-full flex justify-center gap-20">
        <NavLink to="/" isActive={location.pathname === '/'}>Home</NavLink>
        {isLoggedIn && <NavLink to="/dashboard" isActive={location.pathname === '/dashboard'}>Dashboard</NavLink>}
        <NavLink to="/about" isActive={location.pathname === '/about'}>About Us</NavLink>
      </div>

      {!isLoggedIn ? (
          <div className="flex gap-4 items-center justify-end">
            <Link to="/register">
              <button className="text-xl text-white font-bold rounded-lg bg-slate-600 hover:bg-indigo-400 px-6 py-3 transition duration-300 ease-in-out">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="text-xl text-white font-bold rounded-lg bg-purple-600 hover:bg-indigo-400 px-6 py-3 transition duration-300 ease-in-out">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 items-center justify-end">
            <span className="text-xl text-black font-bold">
              Hi, {username}
            </span>
            <button onClick={handleLogout} className="text-xl text-white font-bold rounded-lg bg-red-600 hover:bg-red-400 px-6 py-3 transition duration-300 ease-in-out">
              Logout
            </button>
          </div>
        )}
    </nav>
  );
}

// Active styles applied to current page
const NavLink = ({ to, isActive, children }) => {
  return (
    <Link to={to}>
      <h2 className={`text-2xl font-bold ${isActive ? 'text-purple-600' : 'text-black'} hover:text-indigo-400`}>
        {children}
      </h2>
    </Link>
  );
}

export default Navbar;