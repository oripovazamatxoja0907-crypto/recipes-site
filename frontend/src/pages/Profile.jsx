import { useEffect, useState } from "react"
import { useClerk, useUser } from "@clerk/react"
import { api } from "../api"

function Profile() {
  const { user } = useUser()
  const { openUserProfile } = useClerk()
  const [stats, setStats] = useState({ recipes: 0, logs: 0 })

  useEffect(() => {
    if (!user) return
    Promise.all([
      api.get(`/recipes?userId=${user.id}`),
      api.get(`/cooklogs?userId=${user.id}`),
    ])
      .then(([recipes, logs]) => setStats({ recipes: recipes.length, logs: logs.length }))
      .catch(() => {})
  }, [user])

  if (!user) return null

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-bold">Profil</h1>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
        <div className="flex items-center gap-4">
          <img src={user.imageUrl} alt="avatar" className="h-20 w-20 rounded-full" />
          <div>
            <p className="text-xl font-semibold">{user.fullName || "Ism kiritilmagan"}</p>
            <p className="text-stone-500">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-orange-50 p-4 text-center">
            <p className="text-3xl font-bold text-orange-600">{stats.recipes}</p>
            <p className="text-sm text-stone-600">Mening retseptlarim</p>
          </div>
          <div className="rounded-xl bg-orange-50 p-4 text-center">
            <p className="text-3xl font-bold text-orange-600">{stats.logs}</p>
            <p className="text-sm text-stone-600">Pishirilgan marta</p>
          </div>
        </div>

        <button
          onClick={() => openUserProfile()}
          className="mt-6 w-full rounded-xl border border-stone-300 py-2 hover:bg-stone-100"
        >
          Akkauntni boshqarish
        </button>
      </div>
    </div>
  )
}

export default Profile