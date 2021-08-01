import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositiveIntPipe } from 'src/pipes/positiveInt.pipe';
import { CatsService } from './cats.service';

@Controller('cats')
@UseFilters(HttpExceptionFilter) //다 됨.
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  // CatsController라는 소비자가 catsService라는 제품을 주입받음.
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  getAllCat() {
    // HttpException(err message, status)
    console.log('me is Controller :P');
    return 'all cat';
  }
  // cats/:id
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialPet() {
    return 'update partial pet';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
