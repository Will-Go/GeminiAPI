import { Request, Response } from "express";

export const getHealth = (_req: Request, res: Response): void => {
  const currentTime = new Date().toISOString();
  const memoryUsage = process.memoryUsage();

  res.json({
    status: "healthy",
    message: "Hello from the API!",
    timestamp: currentTime,
    uptime: `${Math.floor(process.uptime())} seconds`,
    memory: {
      rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
    },
  });
};
