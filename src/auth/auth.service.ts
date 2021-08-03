import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // cat의 db를 사용하기 위해 종속성 주입사용.
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService, //JwtModule이 제공해주는 공급자.
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // 해당하는 email이 있는지 체크
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    // password가 일치하는지 체크
    const isPasswordValiadated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValiadated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    //jwt 서비스를 사용해서 프론트엔드에게 전달.
    //jwt의 payload는 우리가 만들어줘야한다.
    // sub는 토큰의 제목을 의미. 펫의 고유 식별자.
    const payload = { email: email, sub: cat.id };

    // 토큰 만들어서 보내기. sign을 통해서 만들어준다.
    // asdfasdf.asdfasdf.asdfasd87fa 이렇게 만들어져서 보내짐.
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
