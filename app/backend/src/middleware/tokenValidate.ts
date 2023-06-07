import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default class validToken {
  public static validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ):
    Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const tokenValidate = jwt.verify(authorization, process.env.JWT_SECRET as string);
      req.body.user = tokenValidate;
      return next();
    } catch (error) {
      if (error instanceof Error) { console.log(error.message); }
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
