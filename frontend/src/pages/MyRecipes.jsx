import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import { api } from "../api";

function MyRecipes() {
  const { user } = useUser();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null); // null | { recipe: null | {...} }

  const load = useCallback(async () => {
    if (!user) return;
    try {
      setRecipes(await api.get(`/recipes?userId=${user.id}`));
    } catch {
      setError("Retseptlarni yuklab bo'lmadi.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(recipe) {
    if (!window.confirm(`"${recipe.title}" ni o'chirasizmi?`)) return;
    try {
      await api.delete(`/recipes/${recipe.id}`);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleSaved() {
    setModal(null);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mening retseptlarim</h1>
          <p className="mt-1 text-stone-500">Faqat siz qo'shgan retseptlar</p>
        </div>
        <button
          onClick={() => setModal({ recipe: null })}
          className="rounded-xl bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
        >
          + Retsept qo'shish
        </button>
      </div>

      {loading && <p className="mt-8 text-stone-500">Yuklanmoqda...</p>}
      {error && <p className="mt-8 text-red-500">{error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <p className="mt-8 text-stone-500">
          Hali retsept qo'shmagansiz. "+ Retsept qo'shish" ni bosing.
        </p>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onEdit={(recipe) => setModal({ recipe })}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {modal && (
        <RecipeModal
          recipe={modal.recipe}
          userId={user.id}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}

export default MyRecipes;
