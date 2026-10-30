import { useState } from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false);
  const showImage = recipe.imageUrl && !imgError;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-md">
      {showImage ? (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          onError={() => setImgError(true)}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="flex h-44 items-center justify-center bg-orange-100 text-5xl">
          🍲
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold">{recipe.title}</h3>
        <p className="text-sm text-stone-500">
          ⏱ {recipe.prepTime ?? "—"} daqiqa
        </p>

        <div className="mt-auto flex gap-2 pt-2">
          <Link
            to={`/recipes/${recipe.id}`}
            className="flex-1 rounded-lg bg-orange-500 py-2 text-center text-sm font-medium text-white hover:bg-orange-600"
          >
            Batafsil
          </Link>
          {onEdit && (
            <button
              onClick={() => onEdit(recipe)}
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-100"
            >
              Tahrirlash
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(recipe)}
              className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              O'chirish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
