import { Link } from "react-router-dom";

export default function CreatorCard({ creator }) {
  const name = (creator?.name || "").trim();

  return (
    <Link to={`/creator/${creator.id}`} className="tile tile-creator">
      <div className="tile-creator__name">{name}</div>
    </Link>
  );
}