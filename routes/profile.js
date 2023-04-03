const { Router } = require('express');
const { Profile, getAllProfile, updateProfile, deleteProfile, getProfile } = require('../controllers/profile');
const multer = require('multer');
let { storage } = require("../helper/middleware/multer");
const upload = multer({ storage: storage });
const router = Router();

router.route('/create').post(upload.single(`photo`), Profile);
router.route("/allprofile").get(getAllProfile);
router.route("/profile/:id").get(getProfile);
router.route("/:id").put(upload.single(`photo`), updateProfile);
router.route("/deleteprofile/:id").delete(deleteProfile);

module.exports = router;
