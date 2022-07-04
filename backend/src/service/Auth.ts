import User from '../db/models/User';
import bcrypt from 'bcrypt';
import UserRepository from '../db/repository/UserRepository';
import JwtTokenProvider from './JwtTokenProvider';

interface AuthResponse {
  user: User;
  jwt: string;
}

class Auth {
  private static saltRounds = 10;

  public static async authenticate(usernameOrEmail: string, password: string): Promise<AuthResponse> {
    const user = await UserRepository.findByUsernameOrEmail(usernameOrEmail);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const accessToken = JwtTokenProvider.generateToken(user);
        return { user, jwt: accessToken };
      }
    }
  }

  public static hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }
}

export default Auth;
