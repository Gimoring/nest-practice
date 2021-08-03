import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
//AuthGuard는 Strategy를 자동으로 실행시켜주는 기능을 가지고있다.
export class JwtAuthGuard extends AuthGuard('jwt') {}
