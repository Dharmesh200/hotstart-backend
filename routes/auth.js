const { Router } = require(`express`);
const router = Router();
const { Signup, Signin, getuser } = require(`../controllers/auth`);
const { Protected, Authorize } = require("../helper/middleware/auth");

router.route("/signup").post(Signup);
router.route("/signin").post(Signin);
router.route("/user").get(Protected, Authorize("publisher", "admin"), getuser);

module.exports = router;

