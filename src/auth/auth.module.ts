import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from 'src/cats/cats.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    //passportmodule은 가드에서 사용할 수 있도록 설정해준 것.
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // JwtModule.register는 로그인할 때 쓰임.
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
    // CatsModule 자체를 임포트. exports에 넣은 것들 사용가능. forwardRef 순환모듈 문제 해결.
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
