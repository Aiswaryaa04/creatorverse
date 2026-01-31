import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="page-bg">
      <div className="page">
        {!isHome && (
          <div className="banner">
            <Link to="/" className="banner__text">
              CREATORVERSE
            </Link>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}