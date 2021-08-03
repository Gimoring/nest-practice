import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

// 얘도 D.I 가 가능한 클래스임.
@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findCatByIdWithoutPassword(
    catId: string,
  ): Promise<CatRequestDto | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  // 이메일을 인자로 받아 데이터베이스에 있는지 체크.
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return result;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
