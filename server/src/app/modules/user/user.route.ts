import { Router } from "express";
import { UserControllers } from "../user/user.controller";

import { createUserZodSchema } from "./user.validation";
import { Role } from "./user.interface";
import { zodRequestValidate } from "../../middlewares/zodRequestValidate";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

//  create user
router.post(
  "/register",
  zodRequestValidate(createUserZodSchema),
  UserControllers.register
);

// get me
router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);

export const UserRoutes = router;
