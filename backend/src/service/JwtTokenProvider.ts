import User from '../db/models/User';
import * as jwt from 'jsonwebtoken';
import UserRepository from '../db/repository/UserRepository';

interface JwtDecoded {
  sub: string;
  username: string;
  iat: number;
}

class JwtTokenProvider {
  public static generateToken(user: User): string {
    return jwt.sign({ sub: user.id, username: user.username }, process.env.JWTSECRET);
  }

  public static verifyToken(token: string): Promise<boolean> {
    return new Promise((res) => {
      jwt.verify(token, process.env.JWTSECRET, (e) => {
        res(!e);
      });
    });
  }

  public static decodeUser(token: string): Promise<User> {
    const decoded = <JwtDecoded>jwt.decode(token);
    return UserRepository.findById(decoded.sub);
  }
}

export default JwtTokenProvider;
