import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true, //  mongodb url을 읽을 수 있도록 설정
      useUnifiedTopology: true, // 최신 mongodb 드라이버 엔진을 사용하도록 설정
      useCreateIndex: true, // 몽고db 인덱싱 한다는 의미
      useFindAndModify: false, // default true인데 true면 오류 뜸.
    }),
  ], //모듈을 연결시켜줌.
  controllers: [AppController],
  providers: [AppService], //공급자
})
// Cat, User 모듈이 AppModule로 합쳐져 main으로 감.
// Cat이나 User 모듈에서 export한 서비스들을 앱컨트롤러나, 앱서비스에서 사용이 가능.
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    //forRoutes 인자에 * 넣으면 전체 라우터에 이 미들웨어가 실행 됨.
    mongoose.set('debug', this.isDev); // 개발시 mongoose 쿼리 찍힘
  }
}
