import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  async test(): Promise<string> {
    console.log('gg', process.env.POSTGRES_URL);
    return process.env.POSTGRES_URL;
  }
}
