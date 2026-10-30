import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useUser } from "@clerk/react"
import { api } from "../api"

const empty = { title: "", ingredients: "", steps: "", imageUrl: "", prepTime: "" }

function RecipeForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { user } = useUser()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    api
      .get(`/recipes/${id}`)
      .then((r) =>
        setForm({
          title: r.title ?? "",
          ingredients: r.ingredients ?? "",
          steps: r.steps ?? "",
          imageUrl: r.imageUrl ?? "",
          prepTime: r.prepTime ?? "",
        })
      )
      .catch(() => setErrors([{ message: "Retsept topilmadi" }]))
  }, [id, isEdit])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setErrors([])

    const body = {
      title: form.title,
      ingredients: form.ingredients,
      steps: form.steps,
      imageUrl: form.imageUrl || null,
      ...(form.prepTime !== "" && { prepTime: Number(form.prepTime) }),
    }

    try {
      if (isEdit) await api.put(`/recipes/${id}`, body)
      else await api.post("/recipes", { ...body, userId: user.id })
      navigate("/recipes")
    } catch (err) {
      setErrors(err.errors || [{ message: err.message }])
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full rounded-xl border border-gray-300 p-3"

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link to="/recipes" className="text-sm text-gray-500">← Orqaga</Link>
      <h1 className="mt-2 mb-6 text-3xl font-bold">
        {isEdit ? "Retseptni tahrirlash" : "Yangi retsept"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" value={form.title} onChange={handleChange}
          placeholder="Nomi" className={inputClass} />
        <textarea name="ingredients" value={form.ingredients} onChange={handleChange}
          placeholder="Masalliqlar (har birini yangi qatordan yozing)" rows={5}
          className={inputClass} />
        <textarea name="steps" value={form.steps} onChange={handleChange}
          placeholder="Tayyorlash yo'li" rows={6} className={inputClass} />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange}
          placeholder="Rasm havolasi (ixtiyoriy)" className={inputClass} />
        <input name="prepTime" type="number" value={form.prepTime} onChange={handleChange}
          placeholder="Tayyorlash vaqti (daqiqa)" className={inputClass} />

        {errors.length > 0 && (
          <ul className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {errors.map((e, i) => (
              <li key={i}>{e.field ? `${e.field}: ${e.message}` : e.message}</li>
            ))}
          </ul>
        )}

        <button
          disabled={saving}
          className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-white disabled:opacity-50"
        >
          {saving ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </form>
    </main>
  )
}

export default RecipeForm