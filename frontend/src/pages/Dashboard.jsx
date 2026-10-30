import { useEffect, useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { api } from "../api";

const FILTERS = [
  { key: "all", label: "Hammasi", test: () => true },
  {
    key: "fast",
    label: "Tez (30 daqiqagacha)",
    test: (r) => r.prepTime != null && r.prepTime <= 30,
  },
  {
    key: "mid",
    label: "O'rta (31–60)",
    test: (r) => r.prepTime > 30 && r.prepTime <= 60,
  },
  { key: "long", label: "Uzoq (60+)", test: (r) => r.prepTime > 60 },
];

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api
      .get("/recipes")
      .then(setRecipes)
      .catch(() =>
        setError("Retseptlarni yuklab bo'lmadi. Backend ishlayaptimi?"),
      )
      .finally(() => setLoading(false));
  }, []);

  const searched = useMemo(() => {
    const q = search.trim().toLowerCase();
    return recipes.filter((r) => (r.title ?? "").toLowerCase().includes(q));
  }, [recipes, search]);

  const visible = useMemo(() => {
    const active = FILTERS.find((f) => f.key === filter);
    return searched.filter(active.test);
  }, [searched, filter]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-stone-500">
        Hamma foydalanuvchilarning retseptlari
      </p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Retsept nomini qidiring..."
        className="mt-6 w-full rounded-xl border border-stone-300 bg-white p-3 outline-none focus:border-orange-400"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = searched.filter(f.test).length;
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                active
                  ? "bg-orange-500 text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-100"
              }`}
            >
              {f.label} ({count})
            </button>
          );
        })}
      </div>

      {loading && <p className="mt-8 text-stone-500">Yuklanmoqda...</p>}
      {error && <p className="mt-8 text-red-500">{error}</p>}
      {!loading && !error && visible.length === 0 && (
        <p className="mt-8 text-stone-500">Hech narsa topilmadi.</p>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
