const router = require("express").Router()
const c = require("../controller/cooklog.controller")
const { validate, validateId } = require("../middlewere/validate")
const { cookLogSchema, cookLogUpdateSchema } = require("../validation/cooklog.validation")

router.get("/", c.getAll)
router.get("/:id", validateId, c.getOne)
router.post("/", validate(cookLogSchema), c.create)
router.put("/:id", validateId, validate(cookLogUpdateSchema), c.update)
router.delete("/:id", validateId, c.remove)

module.exports = router