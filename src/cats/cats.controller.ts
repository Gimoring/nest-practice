import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositiveIntPipe } from 'src/pipes/positiveInt.pipe';
import { CatsService } from './cats.service';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter) //다 됨.
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  // CatsController라는 소비자가 catsService라는 제품을 주입받음.
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  // cats/
  @ApiOperation({ summary: '현재 고양이 가져오기' }) // Swagger 이름 설정.
  @UseGuards(JwtAuthGuard) // 인증처리 가드
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error!',
  })
  @ApiResponse({
    status: 200,
    description: 'Success!',
    type: ReadOnlyCatDto, //성공했을시 받을 값
  })
  @ApiOperation({ summary: '회원가입' }) // Swagger 이름 설정.
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' }) // Swagger 이름 설정.
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '이미지 업로드' }) // Swagger 이름 설정.
  @Post('upload/')
  uploadCatImg() {
    return 'uploadImg';
  }
}
