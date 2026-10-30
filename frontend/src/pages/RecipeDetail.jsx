import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "@clerk/react";
import { api } from "../api";

function RecipeDetail() {
  const { id } = useParams();
  const { user } = useUser();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState(false);
  const [cooked, setCooked] = useState(false);

  useEffect(() => {
    api
      .get(`/recipes/${id}`)
      .then(setRecipe)
      .catch(() => setError("Retsept topilmadi"));
  }, [id]);

  async function handleCooked() {
    try {
      await api.post("/cooklogs", {
        recipeId: recipe.id,
        userId: user.id,
        cookedAt: new Date().toISOString(),
      });
      setCooked(true);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!recipe) return <p className="text-stone-500">Yuklanmoqda...</p>;

  const showImage = recipe.imageUrl && !imgError;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/dashboard"
        className="text-sm text-stone-500 hover:text-orange-600"
      >
        ← Orqaga
      </Link>

      <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
        {showImage ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            onError={() => setImgError(true)}
            className="h-64 w-full object-cover"
          />
        ) : (
          <div className="flex h-64 items-center justify-center bg-orange-100 text-7xl">
            🍲
          </div>
        )}

        <div className="p-6">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <p className="mt-1 text-stone-500">
            ⏱ {recipe.prepTime ?? "—"} daqiqa
          </p>

          <h2 className="mb-2 mt-6 text-xl font-semibold">Masalliqlar</h2>
          <ul className="list-disc space-y-1 pl-6">
            {recipe.ingredients.split("\n").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2 className="mb-2 mt-6 text-xl font-semibold">Tayyorlash</h2>
          <p className="whitespace-pre-line">{recipe.steps}</p>

          <button
            onClick={handleCooked}
            disabled={cooked}
            className="mt-8 rounded-xl bg-orange-500 px-5 py-2 font-medium text-white disabled:bg-green-500"
          >
            {cooked ? "✅ Qayd etildi" : "Men buni pishirdim"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
