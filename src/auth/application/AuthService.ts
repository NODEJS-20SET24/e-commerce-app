import { Injectable } from 'src/common/Injectable';
import { UserRepository } from '../domain/UserRepository';
import { AuthRepository, Token } from '../domain/AuthRepository';
import { CustomException } from 'src/common/CustomException';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository
  ) {}

  async login(username: string, password: string): Promise<Token> {
    const user = await this.userRepository.findByUsername(username);
    
    if (user?.password !== password) {
      throw new CustomException(401, 'Unauthorized', {});
    }

    return this.authRepository.getToken(user.id, user.username);
  }
}
