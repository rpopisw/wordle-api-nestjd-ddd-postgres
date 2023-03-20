import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  
  @Get()
  getHello(): { status: string} {
    return {
      status: 'ok',
    }
  }
}
 