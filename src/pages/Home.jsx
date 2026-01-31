import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-hero">
      <div className="home-hero__title">CREATORVERSE</div>

      <div className="home-actions">
        <Link to="/creators" className="pill-btn">
          View Creators
        </Link>

        <Link to="/new" className="pill-btn">
          Add Creator
        </Link>
      </div>
    </div>
  );
}