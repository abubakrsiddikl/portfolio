/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";
import { JwtPayload } from "jsonwebtoken";

//  Create Blog
const createBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const thumbnail = req?.file?.path;
    const payload = {
      ...req.body,
      thumbnail,
    };
    const result = await BlogServices.createBlog(payload, decodedToken);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Blog created successfully",
      data: result.data,
    });
  }
);

//  Get All Blogs
const getAllBlogs = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BlogServices.getAllBlogs();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Blogs retrieved successfully",
      data: result.data,
    });
  }
);

//  Get Single Blog by Slug
const getBlogBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const result = await BlogServices.getBlogBySlug(slug);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Blog retrieved successfully",
      data: result.data,
    });
  }
);

//  Update Blog
const updateBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const thumbnail = req?.file?.path;
    const payload = req.file ? { ...req.body, thumbnail } : { ...req.body };
    const result = await BlogServices.updateBlog(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Blog updated successfully",
      data: result.data,
    });
  }
);

// Delete Blog
const deleteBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BlogServices.deleteBlog(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Blog deleted successfully",
      data: result.data,
    });
  }
);

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
