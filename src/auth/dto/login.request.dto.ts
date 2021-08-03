import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats/cats.schema';

// cat 모델에서 email, password 빼오기.
export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
