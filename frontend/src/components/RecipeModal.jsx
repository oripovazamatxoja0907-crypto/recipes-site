import { useState } from "react";
import { api } from "../api";

function RecipeModal({ recipe, userId, onClose, onSaved }) {
  const isEdit = Boolean(recipe);
  const [form, setForm] = useState({
    title: recipe?.title ?? "",
    ingredients: recipe?.ingredients ?? "",
    steps: recipe?.steps ?? "",
    imageUrl: recipe?.imageUrl ?? "",
    prepTime: recipe?.prepTime ?? "",
  });
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErrors([]);

    const body = {
      title: form.title,
      ingredients: form.ingredients,
      steps: form.steps,
      imageUrl: form.imageUrl || null,
      ...(form.prepTime !== "" && { prepTime: Number(form.prepTime) }),
    };

    try {
      if (isEdit) await api.put(`/recipes/${recipe.id}`, body);
      else await api.post("/recipes", { ...body, userId });
      onSaved();
    } catch (err) {
      setErrors(err.errors || [{ message: err.message }]);
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-stone-300 p-3 outline-none focus:border-orange-400";

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {isEdit ? "Retseptni tahrirlash" : "Yangi retsept"}
          </h2>
          <button onClick={onClose} className="text-2xl text-stone-400">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nomi"
            className={inputClass}
          />
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            placeholder="Masalliqlar (har birini yangi qatordan)"
            rows={4}
            className={inputClass}
          />
          <textarea
            name="steps"
            value={form.steps}
            onChange={handleChange}
            placeholder="Tayyorlash yo'li"
            rows={5}
            className={inputClass}
          />
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Rasm havolasi (ixtiyoriy)"
            className={inputClass}
          />
          <input
            name="prepTime"
            type="number"
            value={form.prepTime}
            onChange={handleChange}
            placeholder="Tayyorlash vaqti (daqiqa)"
            className={inputClass}
          />

          {errors.length > 0 && (
            <ul className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {errors.map((e, i) => (
                <li key={i}>
                  {e.field ? `${e.field}: ${e.message}` : e.message}
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-stone-300 px-4 py-2"
            >
              Bekor qilish
            </button>
            <button
              disabled={saving}
              className="rounded-xl bg-orange-500 px-5 py-2 font-medium text-white disabled:opacity-50"
            >
              {saving ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeModal;
