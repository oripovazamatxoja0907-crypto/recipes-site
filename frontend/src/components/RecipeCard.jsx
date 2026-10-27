import { useState } from "react";

function RecipeCard({ recipe }) {
  const [imgError, setImgError] = useState(false);
  const showImage = recipe.imageUrl && !imgError;

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-3">
      {showImage ? (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          onError={() => setImgError(true)}
          className="h-40 w-full object-cover rounded-xl"
        />
      ) : (
        <div className="h-40 rounded-xl bg-orange-100 flex items-center justify-center text-5xl">
          🍲
        </div>
      )}
      <h3 className="text-lg font-semibold">{recipe.title}</h3>
      <p className="text-sm text-gray-500">⏱ {recipe.prepTime} daqiqa</p>
    </div>
  );
}

export default RecipeCard;
