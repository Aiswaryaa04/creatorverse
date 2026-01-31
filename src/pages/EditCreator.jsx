import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert(error.message);
        console.error(error);
        navigate("/creators");
        return;
      }

      setName(data?.name || "");
      setUrl(data?.url || "");
      setDescription(data?.description || "");
      setImageURL(data?.imageURL || "");
      setLoading(false);
    };

    load();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !url.trim()) {
      alert("Name and URL are required.");
      return;
    }

    const { error } = await supabase
      .from("creators")
      .update({
        name: name.trim(),
        url: url.trim(),
        description: description.trim() || null,
        imageURL: imageURL.trim() || null,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      console.error(error);
      return;
    }

    navigate(`/creator/${id}`);
  };

  if (loading) return <p className="center-note">Loading...</p>;

  return (
    <>
      <div className="section-pill">Edit Creator</div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Name (required)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="input"
          placeholder="URL (required)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <input
          className="input"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="input"
          placeholder="Image URL (optional)"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />

        <button className="pill-btn pill-btn--small" type="submit">
          Save
        </button>
      </form>
    </>
  );
}