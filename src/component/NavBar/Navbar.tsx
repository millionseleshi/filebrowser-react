import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";

const NavBar = () => {
  const { user } = useAuth();
  const { signOut } = useAuth();
  const handleLogOut = () => {
    signOut();
  };
  return (
    <div className="navbar bg-blue-500">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {user && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="list-item">
                <NavLink to={"/"}>Home</NavLink>
              </li>
            </ul>
          )}
        </div>

        <button className="btn btn-ghost">
          <NavLink to={"/"}>M coder</NavLink>
        </button>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <button className="btn btn-ghost">
                  <NavLink to={"/"}>Home</NavLink>
                </button>
              </ul>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <div className="btn"> {user?.email}</div>
              </div>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <p>
            <NavLink to="/login">Login</NavLink>
          </p>
        )}
      </div>
    </div>
  );
};

export default NavBar;
