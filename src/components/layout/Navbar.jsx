import { Link, useLocation } from "react-router-dom";

import logo from "/DiSA_logo.png";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar bg-transparent w-full flex items-center p-2 top-0 gap-4">
      <Link to="/">
        <img src={logo} className="max-h-20 pl-5" alt="DiSA HomePage" />
      </Link>
      <div className="w-full flex justify-center gap-20">
        <NavLink to="/" isActive={location.pathname === '/'}>Home</NavLink>
        <NavLink to="/dashboard" isActive={location.pathname === '/dashboard'}>Dashboard</NavLink>
        <NavLink to="/about" isActive={location.pathname === '/about'}>About Us</NavLink>
      </div>

      <div className="flex gap-4 pr-5 items-center">
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
    </nav>
  );
}

// Componente NavLink para aplicar estilo ativo
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
