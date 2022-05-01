import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCookie from '@fastify/cookie';
import fastifyHelmet from '@fastify/helmet';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { HttpExceptionFilter } from './utils/exception-filter';
import { filterOnly } from './utils/winston-level-filter';
import { RequestLogger } from './utils/winston-request-logger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      //define winston as a logger in place of nest's native logger
      logger: WinstonModule.createLogger({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          winston.format.prettyPrint(),
        ),
        transports: [
          // console logger
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              nestWinstonModuleUtilities.format.nestLike('logger', {
                prettyPrint: true,
              }),
            ),
          }),
          // error logger
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: filterOnly('error'),
            eol: '\n',
          }),
          // requests logger
          new winston.transports.File({
            filename: 'logs/request.log',
            level: 'verbose',
            format: filterOnly('verbose'),
            eol: '\n',
          }),
        ],
      }),
    },
  );

  //set 'api' as global prefix
  app.setGlobalPrefix('api');

  //setting up swagger
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('store api')
      .setVersion('1.1')
      .setDescription('placeholder')
      .build(),
  );
  SwaggerModule.setup('docs', app, swaggerDocument);

  //CORS settings
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,POST,PATCH,DELETE',
  });

  //registering fastify cookies middleware
  app.register(fastifyCookie);

  //registering fastify helmet middleware
  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  //globalPipes for validation and error handling
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new RequestLogger());

  const port = configService.getApiPort();
  await app.listen(port, '0.0.0.0');
}
bootstrap();
