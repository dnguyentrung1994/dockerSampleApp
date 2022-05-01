import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    console.log('aaaaaaaa');
    return { message: 'Hello World!' };
  }
}
