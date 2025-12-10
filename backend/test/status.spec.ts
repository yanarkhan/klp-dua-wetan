import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('StatusController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  let tokenAdmin: string;
  let userToken: string;
  let reportId: string;
  let statusId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);

    // ========================================
    // ⬇⬇ Tambahan penting untuk fix constraint
    // ========================================
    await testService['prismaService'].statusReport.deleteMany({});
    // ========================================

    await testService.deleteAll();
    await testService.createAdmin();
    await testService.createUser();

    tokenAdmin = 'test-admin';
    userToken = 'test';

    const report = await testService.createReport();
    reportId = report.id_laporan;
  });

  // ==================== CREATE ====================
  describe('POST /api/status/:reportId', () => {
    it('should be rejected if request invalid', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/status/${reportId}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send({
          status: '',
          keterangan: '',
          tanggal: '',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be forbidden if user is not admin', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/status/${reportId}`)
        .set('Authorization', userToken)
        .send({
          status: 'Diproses',
          keterangan: 'Sedang diproses',
          tanggal: '2025-12-05',
        });

      logger.info(response.body);
      expect(response.status).toBe(403);
    });

    it('should create status successfully by admin', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/status/${reportId}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send({
          status: 'Diproses',
          keterangan: 'Sedang diproses',
          tanggal: '2025-12-05',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      statusId = response.body.data.id_status;
    });
  });

  // ==================== GET ====================
  describe('GET /api/status/:reportId/:statusId', () => {
    beforeEach(async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/status/${reportId}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send({
          status: 'Baru',
          keterangan: 'Status awal',
          tanggal: '2025-12-05',
        });

      statusId = res.body.data.id_status;
    });

    it('should return 404 if status not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/status/${reportId}/9999`)
        .set("Authorization", `Bearer ${tokenAdmin}`);

      logger.info(response.body);
      expect(response.status).toBe(404);
    });

    it('should get status successfully (user can read)', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/status/${reportId}/${statusId}`)
        .set('Authorization', userToken);

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id_status).toBe(statusId);
    });
  });

  // ==================== UPDATE ====================
  describe('PUT /api/status/:reportId', () => {
    beforeEach(async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/status/${reportId}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send({
          status: 'Baru',
          keterangan: 'Awal',
          tanggal: '2025-12-05',
        });

      statusId = res.body.data.id_status;
    });

    it('should reject if invalid request', async () => {
      const response = await request(app.getHttpServer())
        .put(`/api/status/${reportId}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send({
          id_status: statusId,
          status: '',
          keterangan: '',
          tanggal: '',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
    });

    it('should reject update if user not admin', async () => {
      const response = await request(app.getHttpServer())
        .put(`/api/status/${reportId}`)
        .set('Authorization', userToken)
        .send({
          id_status: statusId,
          status: 'Updated',
          keterangan: 'Done',
          tanggal: '2025-12-05',
        });

      logger.info(response.body);
      expect(response.status).toBe(403);
    });

    it('should update status successfully', async () => {
      const response = await request(app.getHttpServer())
        .put(`/api/status/${reportId}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send({
          id_status: statusId,
          status: 'Diproses',
          keterangan: 'Status berubah',
          tanggal: '2025-12-05',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.status).toBe('Diproses');
    });
  });

  // ==================== DELETE ====================
  describe('DELETE /api/status/:reportId/:statusId', () => {
    beforeEach(async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/status/${reportId}`)
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send({
          status: 'Awal',
          keterangan: 'Testing delete',
          tanggal: '2025-12-05',
        });

      statusId = res.body.data.id_status;
    });

    it('should reject delete if user not admin', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/status/${reportId}/${statusId}`)
        .set('Authorization', userToken);

      logger.info(response.body);
      expect(response.status).toBe(403);
    });

    it('should delete status successfully', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/status/${reportId}/${statusId}`)
        .set("Authorization", `Bearer ${tokenAdmin}`);

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
  });
});
