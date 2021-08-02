import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

// 스키마에 대한 옵션
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options) // 스키마정의시 필요
export class Cat extends Document {
  @ApiProperty({
    example: 'gimoring@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Juni',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12345',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
} // document  상속

export const CatSchema = SchemaFactory.createForClass(Cat); // Cat 클래스를 스키마로 만들어줌.

// mongoose Virtual Field
// 실제로 db에 저장되진 않지만, 비즈니스 로직에 사용할 수 있도록 제공해주는 필드임.
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
