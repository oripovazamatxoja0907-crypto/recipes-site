const router = require("express").Router()
const c = require("../controller/recipe.controller")
const { validate, validateId } = require("../middlewere/validate")
const { recipeSchema, recipeUpdateSchema } = require("../validation/recipe.validation")

router.get("/", c.getAll)
router.get("/:id", validateId, c.getOne)
router.post("/", validate(recipeSchema), c.create)
router.put("/:id", validateId, validate(recipeUpdateSchema), c.update)
router.delete("/:id", validateId, c.remove)

module.exports = router