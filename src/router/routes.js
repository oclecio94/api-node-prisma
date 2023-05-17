import { Router } from "express";
import UserController from "../controllers/UserController";
import PostController from "../controllers/PostController";
import { authenticate } from "../controllers/authController";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.post("/user", UserController.createUser);

router.get("/users", verifyToken, UserController.findAllUsers);

router.get("/user/:id", verifyToken, UserController.findUser);

router.put("/user/:id", verifyToken, UserController.updateUser);

router.delete("/user/:id", verifyToken, UserController.deleteUser);

////////////////////

router.post("/post/user/:id", PostController.craetePost);

router.get("/posts", PostController.FindAllPosts);

router.put("/post/:id", PostController.UpdatePost);

///////////////////

router.post("/login", authenticate);

export { router };
