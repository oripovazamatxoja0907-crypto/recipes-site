const router = require("express").Router()
const c = require("../controller/user.controller")
const { validate } = require("../middlewere/validate")
const { userSchema, userUpdateSchema } = require("../validation/user.validation")

router.get("/", c.getAll)
router.get("/:id", c.getOne)
router.post("/", validate(userSchema), c.create)
router.put("/:id", validate(userUpdateSchema), c.update)
router.delete("/:id", c.remove)

module.exports = router