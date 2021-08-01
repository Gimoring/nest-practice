import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [CatsModule], //모듈을 연결시켜줌.
  controllers: [AppController],
  providers: [AppService], //공급자
})
// Cat, User 모듈이 AppModule로 합쳐져 main으로 감.
// Cat이나 User 모듈에서 export한 서비스들을 앱컨트롤러나, 앱서비스에서 사용이 가능.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    //forRoutes 인자에 * 넣으면 전체 라우터에 이 미들웨어가 실행 됨.
  }
}
