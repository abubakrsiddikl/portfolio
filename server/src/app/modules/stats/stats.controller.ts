import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatsServices } from "./stats.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await StatsServices.getStats();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Portfolio statistics retrieved successfully",
    data: result.data,
  });
});

export const StatsControllers = {
  getStats,
};
