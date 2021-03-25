const express =  require("express");
const userSignup = require("../controller/auth");
const validator = require("../validator/validate")
const {userById} = require("../controller/user");

const router = express.Router();

router.post("/signup", validator.userValidator, userSignup.signup);
router.post("/signin", userSignup.signin);
router.get("/signout", userSignup.signout);

router.param("userId", userById);

module.exports = router; 