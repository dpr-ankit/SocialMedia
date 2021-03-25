const express =  require("express");
const user = require("../controller/user");
const validator = require("../validator/validate")
const { userById } = require("../controller/user");
const { requireSignin } = require("../controller/auth");

const router = express.Router();

router.get("/users", user.getUsers);
router.get("/users/:userId", requireSignin, user.getUser);
router.put("/users/:userId", requireSignin, user.updateUser);
router.delete("/users/:userId", requireSignin, user.deleteUser);

router.param("userId", userById);

module.exports = router; 