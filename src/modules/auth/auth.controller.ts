import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../../meta';
import { instanceToPlain } from 'class-transformer';

@Public()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('sign_in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() _authDto: AuthDto) {
    const user = instanceToPlain(
      await this.authService.validateUser(_authDto.username, _authDto.password),
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    const _user = {
      ...user,
      token: await this.jwtService.signAsync(user),
    };
    return _user;
  }

  @Post('sign_up')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }
}
