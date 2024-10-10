import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controller/AuthController';
import { AuthService } from './application/AuthService';
import { InMemoryUserRepository } from './infrastructure/repository/InMemoryUserRepository';
import { JwtAuthRepository } from './infrastructure/repository/JwtAuthRepository';
import { UserRepository } from './domain/UserRepository';
import { AuthRepository } from './domain/AuthRepository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants/AuthConstants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    InMemoryUserRepository,
    JwtAuthRepository,
    {
      provide: UserRepository,
      useExisting: InMemoryUserRepository
    },
    {
      provide: AuthRepository,
      useExisting: JwtAuthRepository
    }
  ]
})
export class AuthModule {}
