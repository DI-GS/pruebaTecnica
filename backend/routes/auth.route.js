import { Router } from "express";
import {registerTask, getTasks,updateTask, getTask, deleteTask} from "../controllers/task.controller.js"
import { login, logout, refreshToken, register } from "../controllers/auth.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";

const router = Router();

/////////////////////////MÉTODOS POST////////////////////////
router.post("/register", bodyRegisterValidator, register);
router.post("/register-task", requireToken, registerTask);
router.post("/login", bodyLoginValidator, login);

/////////////////////////MÉTODOS GET/////////////////////////
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);
router.get("/get-tasks", requireToken,getTasks);
router.get("/get-task/:userId", requireToken, getTask);

/////////////////////////MÉTODOS PUT/////////////////////////
router.put("/update-task", requireToken, updateTask);

/////////////////////////MÉTODOS DELETE//////////////////////
router.delete("/delete-task", requireToken, deleteTask);



export default router;
