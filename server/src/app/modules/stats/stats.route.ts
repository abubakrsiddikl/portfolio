import express from "express";
import { StatsControllers } from "./stats.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.get("/", checkAuth(Role.ADMIN), StatsControllers.getStats);

export const StatsRoutes = router;
