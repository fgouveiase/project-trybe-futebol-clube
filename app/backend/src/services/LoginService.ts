import { sign, Secret } from 'jsonwebtoken';
import User from '../database/models/User';

interface LoginInterface {
  email: string;
  password: string;
}

const secretKey: Secret = process.env.JWT_SECRET as Secret;
const jwtConfig: object = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

export default class LoginService {
  public static async login(LoginInterface: LoginInterface): Promise<string> {
    const { email } = LoginInterface;
    const foundUser: User | null = await User.findOne({ where: { email } }) as User;
    const token = sign({
      data: {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        role: foundUser.role,
      },
    }, secretKey, jwtConfig);

    return token;
  }

  public static async getRole(email: string): Promise<string> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return 'Invalid email or password';
    }

    const { role } = user.dataValues;
    return role;
  }
}
