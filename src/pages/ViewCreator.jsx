import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";

export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setCreator(null);
      } else {
        setCreator(data);
      }

      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleDelete = async () => {
    if (!creator) return;

    const ok = window.confirm(`Delete "${creator.name}"? This cannot be undone.`);
    if (!ok) return;

    setDeleting(true);

    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Delete failed. Check Supabase RLS/policies or console logs.");
      setDeleting(false);
      return;
    }

    navigate("/creators");
  };

  if (loading) return <p className="center-note">Loading...</p>;
  if (!creator) return <p className="center-note">Creator not found.</p>;

  return (
    <div className="page-bg">
      <div className="page">
        <div className="section-pill">{creator.name}</div>

        <div className="details">
          <div>
            <div className="details__text">
              {creator.description ? creator.description : "No description provided."}
            </div>

            {creator.url ? (
              <a
                className="details__link"
                href={creator.url}
                target="_blank"
                rel="noreferrer"
              >
                {creator.url}
              </a>
            ) : (
              <div className="details__text">No URL provided.</div>
            )}
          </div>

          <div className="details__right">
            {creator.imageURL ? (
              <img
                className="details__image"
                src={creator.imageURL}
                alt={creator.name}
              />
            ) : (
              <div className="details__image details__image--empty">
                No image provided
              </div>
            )}
          </div>
        </div>

        <div className="details-actions">
          <Link to={`/edit/${creator.id}`} className="pill-btn pill-btn--small">
            Edit
          </Link>

          <button
            className="pill-btn pill-btn--small"
            onClick={handleDelete}
            disabled={deleting}
            type="button"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>

          <Link to="/creators" className="pill-btn pill-btn--small">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}