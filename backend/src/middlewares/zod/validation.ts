import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

// Reusable password schema
export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(32, { message: "Password must be at most 32 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[\W_]/, {
    message: "Password must contain at least one special character",
  });



export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema, // Ensure login also validates password format if desired, or just use z.string() if loose validation is preferred for login attempts
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, { message: "Refresh token is required" }),
});

export const updateProfileSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long" })
    .optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Current password is required" }),
  newPassword: passwordSchema,
});

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    next(error);
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    next(error);
  }
};

export const validateRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    refreshTokenSchema.parse(req.cookies);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(401).json({
        message: "Unauthorized: Invalid or missing refresh token",
        errors: error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    next(error);
  }
};

export const validateUpdateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    updateProfileSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    next(error);
  }
};

export const validateChangePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    changePasswordSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    next(error);
  }
};
