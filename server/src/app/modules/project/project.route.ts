import express from "express";
import { ProjectControllers } from "./project.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";
import { zodRequestValidate } from "../../middlewares/zodRequestValidate";
import {
  createProjectZodSchema,
  updateProjectZodSchema,
} from "./project.validation";

const router = express.Router();

router.post(
  "/create",
  multerUpload.array("files"),
  checkAuth(Role.ADMIN),
  zodRequestValidate(createProjectZodSchema),
  ProjectControllers.createProject
);
router.get("/", ProjectControllers.getAllProjects);
router.get("/:slug", ProjectControllers.getSingleProject);
router.patch(
  "/update/:id",
  multerUpload.array("files"),
  checkAuth(Role.ADMIN),
  zodRequestValidate(updateProjectZodSchema),
  ProjectControllers.updateProject
);
router.delete("/delete/:id", ProjectControllers.deleteProject);

export const ProjectRoutes = router;
