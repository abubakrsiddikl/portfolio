import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SkillServices } from "./skill.service";

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    icon: req.file?.path,
  };
  const result = await SkillServices.createSkill(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Skill created successfully",
    data: result.data,
  });
});

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await SkillServices.getAllSkills(
    query as Record<string, string>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skills retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SkillServices.getSingleSkill(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill retrieved successfully",
    data: result.data,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const icon = req?.file?.path;
  const payload = req.file ? { ...req.body, icon } : { ...req.body };

  const result = await SkillServices.updateSkill(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill updated successfully",
    data: result.data,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SkillServices.deleteSkill(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill deleted successfully",
    data: result.data,
  });
});

export const SkillControllers = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
