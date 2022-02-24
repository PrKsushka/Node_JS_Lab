import jwt from 'jsonwebtoken';

class TokenService {
  static generateToken(id: number, username: string, role: string) {
    return jwt.sign({ id, username, role }, 'access', { expiresIn: '1h' });
  }

  static refreshToken(id: number, username: string, role: string) {
    return jwt.sign({ id, username, role }, 'refresh', { expiresIn: '1h' });
  }
}

export default TokenService;
