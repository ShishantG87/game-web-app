import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddGame() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // TODO: change base URL to your Render backend when deployed
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_BASE}/api/platforms`)
      .then((res) => res.json())
      .then((data) => setPlatforms(data))
      .catch(() => setError("Failed to load platforms"));
  }, []);

  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !rating || selectedPlatforms.length === 0) {
      setError("Title, rating, and at least one platform are required.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          rating: Number(rating),
          platforms: selectedPlatforms,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create game");
      }

      setSuccess("Game created successfully.");
      setTitle("");
      setDescription("");
      setRating("");
      setSelectedPlatforms([]);

      // optional: go back to home after a short delay
      setTimeout(() => navigate("/home"), 800);
    } catch (err) {
      setError("Error creating game.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Add a New Game</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-800 p-6 rounded shadow space-y-4"
      >
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input
            type="text"
            className="w-full bg-gray-700 rounded px-3 py-2 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Game title"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            className="w-full bg-gray-700 rounded px-3 py-2 outline-none"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description (optional)"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Rating (1–10)</label>
          <input
            type="number"
            min="1"
            max="10"
            className="w-full bg-gray-700 rounded px-3 py-2 outline-none"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Platforms</label>
          <div className="flex flex-col gap-2">
            {platforms.map((p) => (
              <label key={p._id} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-red-600"
                  checked={selectedPlatforms.includes(p._id)}
                  onChange={() => togglePlatform(p._id)}
                />
                <span>{p.name}</span>
              </label>
            ))}
            {platforms.length === 0 && (
              <p className="text-xs text-gray-400">
                No platforms found. Seed them in the backend first.
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded"
        >
          Create Game
        </button>
      </form>
    </div>
  );
}

export default AddGame;
