import {Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cluster from 'cluster';

declare const module: any;
const workers = [];
const logger = new Logger();

const setupWorkerProcesses = () => {
  const numCores = require('os').cpus().length;
  logger.log('Master cluster setting up ' + numCores + ' workers');

  // Fork workers
  for ( let i = 0; i < numCores; i++) {
    workers.push(cluster.fork());

    workers[i].on('message', (message) => {
      logger.log(message);
    });
  }

  cluster.on('online', (worker) => {
    logger.log('Worker ' + worker.process.pid + ' is listening');
  });

  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', (worker, code, signal) => {
    logger.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    logger.log('Starting a new worker');
    workers.push(cluster.fork());
    workers[workers.length - 1].on('message', (message) => {
      logger.log(message);
    });
  });
};

async function setUpNest() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
      .setTitle('Travel agency API')
      .setVersion('1.0')
      .addTag('users')
      .addTag('auth')
      .addTag('companies')
      .addTag('tours')
      .addTag('hotel')
      .addTag('address')
      .addTag('rating')
      .addTag('rooms')
      .addTag('image')
      .addBearerAuth('Authorization', 'header')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '/../files'));
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

async function bootstrap(isClusterRequired) {
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses();
  } else {
    setUpNest();
  }
}
bootstrap(true);
