import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();

// login with credential
router.post("/login", AuthControllers.credentialLogin);

// logout
router.post("/logout", AuthControllers.logout);

export const AuthRoutes = router;
