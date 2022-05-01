import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: FastifyReply): FastifyReply {
    return res.status(HttpStatus.OK).send(this.appService.getHello);
  }
}
