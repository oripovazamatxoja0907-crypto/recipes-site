import { useEffect, useState } from "react"
import { UserButton } from "@clerk/react"
import RecipeCard from "../components/RecipeCard"

const API_URL = import.meta.env.VITE_API_URL

function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadRecipes() {
      try {
        const res = await fetch(`${API_URL}/recipes`)
        if (!res.ok) throw new Error("Server xatosi")
        const data = await res.json()
        setRecipes(data)
      } catch (err) {
        setError("Retseptlarni yuklab bo'lmadi. Backend ishlayaptimi?")
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [])

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Retseptlar</h1>
        <UserButton />
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
  )
}

export default Home