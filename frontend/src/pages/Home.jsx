import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/react";
import RecipeCard from "../components/RecipeCard";
import { api } from "../api";
import { useSyncUser } from "../hooks/useSyncUser"

function Home() {
  useSyncUser();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/recipes")
      .then(setRecipes)
      .catch(() =>
        setError("Retseptlarni yuklab bo'lmadi. Backend ishlayaptimi?"),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Retseptlar</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/recipes/new"
            className="rounded-xl bg-orange-500 px-4 py-2 font-medium text-white"
          >
            + Retsept qo'shish
          </Link>
          <UserButton />
        </div>
      </div>

      {loading && <p className="text-gray-500">Yuklanmoqda...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <p className="text-gray-500">Hozircha retsept yo'q.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </main>
  );
}

export default Home;
