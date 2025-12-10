import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/common/prisma.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController ', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService); 
  });
  

  describe('POST /api/users', () => {
    beforeEach(async () => {
      await testService.deleteUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: '',
          password_hash: '',
          name: '',
          email: '',
          notlp: '',
          tipe_user: '',
        });
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
    // success
    it('should be able to register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test',
          password_hash: 'test1234',
          name: 'testname',
          email: 'test@gmail.com',
          notlp: '088888888888888',
          tipe_user: 'user',
        });
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test");
      expect(response.body.data.name).toBe("testname");
    });

    it('should be rejected if username already exists', async () => {
      await testService.createUser();
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test',
          password_hash: 'test1234',
          name: 'testname',
          email: 'test@gmail.com',
          notlp: '088888888888888',
          tipe_user: 'user',
        });
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
  //test login
  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: '',
          password_hash: '',
        });
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
    // success
    it('should be able to login', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'test',
          password_hash: 'test1234',
        });
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test");
      expect(response.body.data.name).toBe("testname");
      expect(response.body.data.token).toBeDefined();
    });
  });

  //test get user
  describe('GET /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get ('/api/users/current')
        .set('Authorization', 'wrong');
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });
    // success
    it('should be able to get user', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('Authorization', 'test');
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test");
      expect(response.body.data.name).toBe("testname");
    });
  });

  //test update user
  describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch ('/api/users/current')
        .set('Authorization', 'test')
        .send({
          password_hash: '',
          name: '',
          email: '',
          notlp: '',
        });
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
    // success update nama
    it('should be able to update name', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          name: 'testname update',
        });
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test");
      expect(response.body.data.name).toBe("testname update");
    });
    // success update pass
    it('should be able to update password', async () => {
      let response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          password_hash: 'test1234updated',
        });
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test");
      expect(response.body.data.name).toBe("testname");

      response = await request(app.getHttpServer())
        .post('/api/users/login') 
        .send({
          username: 'test',
          password_hash: 'test1234updated',
        });
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(200);
      expect(response.body.data.token).toBeDefined();
    });

  });

  //test logout user
  describe('DELETE /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/users/current')
        .set('Authorization', 'wrong');
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });
    // success
    it('should be able to logout  user', async () => {
      const response = await request(app.getHttpServer())
        .delete ('/api/users/current')
        .set('Authorization', 'test');;
      logger.info('----------------------------------------------/n');
      logger.info(response.body); 
      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);

      const user = await testService.getUser();
      expect(user.token).toBeNull();
    });
  });
});
