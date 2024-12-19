/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import { ZodError } from "zod";
import handleZodError from "../App/Errors/handleZodError";
import handleValidationError from "../App/Errors/handleValidationError";
import { appError } from "../App/Errors/AppError";
import handleCastError from "../App/Errors/handleCastError";
import config from "../App/config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    errorSources = simplifiedError?.errorSources || errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    errorSources = simplifiedError?.errorSources || errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    errorSources = simplifiedError?.errorSources || errorSources;
  } else if (err instanceof appError) {
    statusCode = err.statusCode || statusCode;
    message = err.message || message;
    errorSources = [
      {
        path: "",
        message: err.message || "Unknown application error",
      },
    ];
  } else if (err instanceof Error) {
    message = err.message || message;
    errorSources = [
      {
        path: "",
        message: err.message || "Unknown error",
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err.stack : null,
  });
};

export default globalErrorHandler;
