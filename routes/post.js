const express =  require("express");
const postController = require("../controller/post");
const validator = require("../validator/validate")
const authController = require("../controller/auth");
const {userById} = require("../controller/user");

const router = express.Router();

router.get("/", authController.requireSignin, postController.getPosts);
router.post("/post", validator.postValidator, postController.createPost);

router.param("userId", userById);

module.exports = router; 