import express from "express";
import { SkillControllers } from "./skill.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { zodRequestValidate } from "../../middlewares/zodRequestValidate";
import { createSkillZodSchema, updateSkillZodSchema } from "./skill.validation";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/create",
  multerUpload.single("file"),
  checkAuth(Role.ADMIN),
  zodRequestValidate(createSkillZodSchema),
  SkillControllers.createSkill
);

router.get("/", SkillControllers.getAllSkills);
router.get("/:id", SkillControllers.getSingleSkill);

router.patch(
  "/update/:id",
  multerUpload.single("file"),
  checkAuth(Role.ADMIN),
  zodRequestValidate(updateSkillZodSchema),
  SkillControllers.updateSkill
);

router.delete(
  "/delete/:id",
  checkAuth(Role.ADMIN),
  SkillControllers.deleteSkill
);

export const SkillRoutes = router;
