const { Router } = require(`express`);
const { postmovie } = require(`../controllers/movie`);
const multer = require(`multer`);
const { storage } = require(`../helper/middleware/multer`);
const movieupload = multer({ storage: storage });

const router = Router();

router.route("/upload").post(movieupload.any(), postmovie);

module.exports = router;