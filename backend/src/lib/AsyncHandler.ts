

import type { Request, Response, NextFunction } from 'express';

type AsyncHandlerFn = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const AsyncHandler = (fn: AsyncHandlerFn) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
};

export default AsyncHandler;