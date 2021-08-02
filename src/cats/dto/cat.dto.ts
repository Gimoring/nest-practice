import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// Request 성공했을 시 받을 값.
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  // PickType은 필요한 부분만 상속받을 수 있음.
  @ApiProperty({
    example: '1282103',
    description: 'id',
  })
  id: string;
}
