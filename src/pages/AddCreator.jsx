import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function AddCreator() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !url.trim()) {
      alert("Name and URL are required.");
      return;
    }

    const { error } = await supabase.from("creators").insert([
      {
        name: name.trim(),
        url: url.trim(),
        description: description.trim() || null,
        imageURL: imageURL.trim() || null,
      },
    ]);

    if (error) {
      alert(error.message);
      console.error(error);
      return;
    }

    navigate("/creators");
  };

  return (
    <>
      <div className="section-pill">Add Creator</div>

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
          Create
        </button>
      </form>
    </>
  );
}