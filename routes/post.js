const express =  require("express");
const postController = require("../controller/post");
const validator = require("../validator/validate")
const authController = require("../controller/auth");
const {userById} = require("../controller/user");

const router = express.Router();


router.get("/posts", authController.requireSignin, postController.getPosts);
router.get("/posts/by/:userId", authController.requireSignin, postController.postsBy);
router.post("/post/new/:userId", authController.requireSignin, postController.createPost, validator.postValidator);
router.delete("/post/:postId", authController.requireSignin, postController.isPoster, postController.deletePost)
router.put("/post/:postId", authController.requireSignin, postController.isPoster, postController.updatePost)

router.param("postId", postController.postById);
router.param("userId", userById);

module.exports = router; 