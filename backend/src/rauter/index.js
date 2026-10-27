const router = require("express").Router()

router.use("/recipes", require("./recipe.routes"))
router.use("/cooklogs", require("./cooklog.routes"))
router.use("/users", require("./user.routes"))

module.exports = router