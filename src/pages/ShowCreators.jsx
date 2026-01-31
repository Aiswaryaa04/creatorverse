import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("id", { ascending: true });

      if (error) console.error(error);
      setCreators(data || []);
      setLoading(false);
    };

    fetchCreators();
  }, []);

  // Only show creators with required fields
  const validCreators = useMemo(() => {
    return creators.filter(
      (c) =>
        (c?.name || "").trim().length > 0 &&
        (c?.url || "").trim().length > 0
    );
  }, [creators]);

  if (loading) return <p className="center-note">Loading...</p>;

  // Empty state (Option A)
  if (validCreators.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-title">No creators yet.</div>

        <Link to="/new" className="tile tile-add tile-add--center">
          <div className="tile-add__plus">+</div>
          <div className="tile-add__text">Add creator</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-2">
      {validCreators.map((c) => (
        <CreatorCard key={c.id} creator={c} />
      ))}

      {/* Add Creator always comes after existing cards */}
      <Link to="/new" className="tile tile-add">
        <div className="tile-add__plus">+</div>
        <div className="tile-add__text">Add creator</div>
      </Link>
    </div>
  );
}