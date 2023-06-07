import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';

const regex = (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);

export default class loginValidate {
  public static async isValid(req: Request, res: Response, next: NextFunction)
    :Promise<Response | void> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const compareData: boolean = bcrypt.compareSync(password, findUser.dataValues.password);
    if (password.length < 6 || !compareData || !email.match(regex)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
