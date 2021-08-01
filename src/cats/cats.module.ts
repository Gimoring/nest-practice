import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService], // 공급자. controller 소비자에게 제품 준다.
})
export class CatsModule {}
