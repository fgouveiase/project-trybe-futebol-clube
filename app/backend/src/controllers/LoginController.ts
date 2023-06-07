import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  public static async login(req: Request, res: Response): Promise<Response> {
    try {
      const token = await LoginService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) { console.log(error.message); }
      return res.status(500).json({ message: error });
    }
  }

  public static async getRole(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body.user.data;
      const role = await LoginService.getRole(email);
      return res.status(200).json({ role });
    } catch (error) {
      if (error instanceof Error) { console.log(error.message); }
      return res.status(500).json({ message: error });
    }
  }
}
