import { useEffect, useState } from "react";

function Home() {
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetch("http://localhost:5000/api/platforms")
      .then((res) => res.json())
      .then((data) => setPlatforms(data))
      .catch((err) => console.error("Failed to fetch platforms", err));
  }, []);

  
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:5000/api/games";

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

      {loading && <p className="text-center text-gray-400">Loading games...</p>}

      {!loading && games.length === 0 && (
        <p className="text-center text-gray-400">No games found.</p>
      )}

      <div className="grid gap-4 max-w-3xl mx-auto">
        {games.map((game) => (
          <div key={game._id} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-1">{game.title}</h2>
            {game.description && (
              <p className="text-gray-300 mb-1">{game.description}</p>
            )}
            <p className="text-sm text-gray-400 mb-1">
              Rating: <span className="font-semibold">{game.rating}</span>
            </p>
            <p className="text-sm text-gray-400">
              Platforms:{" "}
              {Array.isArray(game.platforms) && game.platforms.length > 0
                ? game.platforms.map((p) => p.name).join(", ")
                : "None"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
