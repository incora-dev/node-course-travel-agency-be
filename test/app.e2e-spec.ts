import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('USER', () => {
    it('/users', () => {
      return request(app.getHttpServer())
          .get('/users')
          .expect(200);
    });

    it('/users/2 not found', () => {
      return request(app.getHttpServer())
          .get('/users/2')
          .expect(404)
          .expect({
            statusCode: 404,
            message: 'Not found',
          });
    });

    it('/users/1 found', () => {
      return request(app.getHttpServer())
          .get('/users/1')
          .expect(200);
    });
  });
});
