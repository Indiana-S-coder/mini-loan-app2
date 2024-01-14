const router = require("express").Router();
const { login, signup, verifyUser } = require("../controllers/authController.js");
const { verifyLogin } = require("../util/verify.js");


router.post('/login', login)
router.post('/signup', signup)
router.get('/', verifyLogin, verifyUser)

modules.export = router;