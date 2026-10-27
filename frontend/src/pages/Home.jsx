import { UserButton } from "@clerk/react";
import { recipes } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";

function Home() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Retseptlar</h1>
        <UserButton />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </main>
  );
}

export default Home;
