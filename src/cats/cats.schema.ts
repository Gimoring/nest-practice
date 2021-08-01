import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

// 스키마에 대한 옵션
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options) // 스키마정의시 필요
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;
} // document  상속

export const CatSchema = SchemaFactory.createForClass(Cat); // Cat 클래스를 스키마로 만들어줌.
