import { Employee } from 'src/employee/entity/employee';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): Promise<{ accessToken: string }> {
    return this.authService.login(req.user as Employee);
  }
}