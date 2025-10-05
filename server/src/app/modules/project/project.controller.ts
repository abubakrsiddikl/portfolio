import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";
import { IProject } from "./project.interface";
import { JwtPayload } from "jsonwebtoken";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const payload: IProject = {
    ...req.body,
    projectImages: (req.files as Express.Multer.File[]).map(
      (file) => file.path
    ),
  };
  const decodedToken = req.user as JwtPayload;
  const result = await ProjectServices.createProject(payload, decodedToken);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project created successfully",
    data: result.data,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await ProjectServices.getAllProjects(
    query as Record<string, string>
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects retrieved successfully",
    data: result.data,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await ProjectServices.getSingleProject(slug);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project retrieved successfully",
    data: result.data,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload: IProject = req?.files
    ? {
        ...req.body,
        projectImages: (req?.files as Express.Multer.File[]).map(
          (file) => file.path
        ),
      }
    : { ...req.body };
  const result = await ProjectServices.updateProject(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully",
    data: result.data,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectServices.deleteProject(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully",
    data: result.data,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
