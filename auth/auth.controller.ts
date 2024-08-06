import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  signup(@Body() userDTO: CreateUserDTO): Promise<CreateUserDTO> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  login() {}

  @Get('enable-2fa')
  enable2fa() {}

  @Post('validate-2fa')
  validate2fa() {}

  @Get('disbale-2fa')
  disbale2fa() {}

  @Get('profile')
  profile() {}

  @Get('test')
  test() {}
}
