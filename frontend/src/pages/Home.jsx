import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [loading, setLoading] = useState(false);

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    rating: "",
  });

  // Fetch platforms once
  useEffect(() => {
    fetch(`${API_BASE}/api/platforms`)
      .then((res) => res.json())
      .then((data) => setPlatforms(data))
      .catch((err) => console.error("Failed to fetch platforms", err));
  }, []);

  // Fetch games when platform filter changes
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        let url = `${API_BASE}/api/games`;

        if (selectedPlatform !== "all") {
          url += `?platform=${selectedPlatform}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Failed to fetch games", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedPlatform]);

  // Delete a game
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this game?")) return;

    try {
      await fetch(`${API_BASE}/api/games/${id}`, {
        method: "DELETE",
      });

      setGames((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.error("Failed to delete game", err);
    }
  };

  // Start editing a game
  const startEdit = (game) => {
    setEditingId(game._id);
    setEditForm({
      title: game.title,
      description: game.description ?? "",
      rating: game.rating,
    });
  };

  // Submit edit
  const submitEdit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/games/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) {
        console.error("Failed to update game");
        return;
      }

      // Update front-end state; keep existing platforms
      setGames((prev) =>
        prev.map((g) =>
          g._id === editingId ? { ...g, ...editForm } : g
        )
      );

      setEditingId(null);
    } catch (err) {
      console.error("Failed to update game", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Game Catalog</h1>

      {/* Platform Filter */}
      <div className="max-w-xl mx-auto mb-6 flex gap-3 items-center">
        <label className="text-lg pl-35">Filter by platform:</label>
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
        >
          <option value="all">All</option>
          {platforms.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-center text-gray-400">Loading games...</p>
      )}

      {!loading && games.length === 0 && (
        <p className="text-center text-gray-400">No games found.</p>
      )}

      {/* Edit form */}
      {editingId && (
        <form
          onSubmit={submitEdit}
          className="bg-gray-800 p-4 rounded max-w-xl mx-auto mb-6"
        >
          <h2 className="text-xl font-bold mb-3">Edit Game</h2>

          <input
            className="w-full mb-3 p-2 bg-gray-700 rounded"
            placeholder="Title"
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
          />

          <textarea
            className="w-full mb-3 p-2 bg-gray-700 rounded"
            placeholder="Description"
            value={editForm.description}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                description: e.target.value,
              })
            }
          />

          <input
            className="w-full mb-3 p-2 bg-gray-700 rounded"
            placeholder="Rating"
            type="number"
            value={editForm.rating}
            onChange={(e) =>
              setEditForm({ ...editForm, rating: e.target.value })
            }
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Game list */}
      <div className="grid gap-4 max-w-3xl mx-auto">
        {games.map((game) => (
          <div key={game._id} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-1">
              {game.title}
            </h2>
            {game.description && (
              <p className="text-gray-300 mb-1">{game.description}</p>
            )}
            <p className="text-sm text-gray-400 mb-1">
              Rating:{" "}
              <span className="font-semibold">{game.rating}</span>
            </p>
            <p className="text-sm text-gray-400 mb-3">
              Platforms:{" "}
              {Array.isArray(game.platforms) && game.platforms.length > 0
                ? game.platforms.map((p) => p.name).join(", ")
                : "None"}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => startEdit(game)}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(game._id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
