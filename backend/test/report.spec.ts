import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/common/prisma.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('ReportController ', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;
  let prisma: PrismaService;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule ],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService); 
  });

describe('POST /api/report', () => {
  beforeEach(async () => {
    await testService.deleteAll();
    await testService.createUser(); 
    token = 'test';  // sama seperti kontak
  });

  it('should be rejected if request is invalid', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/report')
      .set('Authorization', token)
      .send({
        id_laporan: '',
        judul: '',
        bukti: '',
        lokasi: '',
        kategori: '',
        deskripsi: '',
        surat: '',
        usaha: '',
        tanggal: '',
      });

    logger.info(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should be rejected if not logged in', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/report')
      .send({
        id_laporan: 'RPT001',
        judul: 'Kerusakan Jalan',
        bukti: 'photo.jpg',
        lokasi: 'Jl. Mawar',
        kategori: 'Infrastruktur',
        deskripsi: 'Rusak parah',
        surat: null,
        usaha: 'Perbaikan segera',
        tanggal: '2025-12-04',
      });

    logger.info(response.body);

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it('should be able to create report', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/report')
      .set('Authorization', token)
      .send({
        id_laporan: 'RPT001',
        judul: 'Kerusakan Jalan',
        bukti: 'photo1.jpg',
        lokasi: 'Jl. Mawar',
        kategori: 'Infrastruktur',
        deskripsi: 'Jalan berlubang parah',
        surat: null,
        usaha: 'Perbaikan segera diperlukan',
        tanggal: '2025-12-04',
      });

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id_laporan).toBe('RPT001');
    expect(response.body.data.judul).toBe('Kerusakan Jalan');
    expect(response.body.data.id_user).toBeDefined();
  });
});
// get report
describe('GET /api/report/:reportId', () => {
  beforeEach(async () => {
    await testService.deleteAll();
    await testService.createUser(); 
    await testService.createReport(); 
    token = 'test';  // sama seperti kontak
  });

  it('should be rejected if report is not found', async () => {
    const report = await testService.getReport();

    if (!report) {
      throw new Error('Report tidak ditemukan untuk test ini');
    }

    const response = await request(app.getHttpServer())
      .get(`/api/report/${report.id_laporan + 1}`)
      .set('Authorization', token);

    logger.info(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should be able to get report', async () => {
    const report = await testService.getReport();
    if (!report) {
      throw new Error('Report tidak ditemukan untuk test ini');
    }
    const response = await request(app.getHttpServer())
      .get(`/api/report/${report.id_laporan}`)
      .set('Authorization', token);

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id_laporan).toBe('RPT001');
    expect(response.body.data.judul).toBe('Kerusakan Jalan');
    expect(response.body.data.id_user).toBeDefined();
  });
});

// put report
describe('PUT /api/report/:reportId', () => {
  beforeEach(async () => {
    await testService.deleteAll();
    await testService.createUser(); 
    await testService.createReport(); 
    token = 'test';  // sama seperti kontak
  });

  it('should be rejected if request is invalid', async () => {
    const report = await testService.getReport();
    const response = await request(app.getHttpServer())
      .put(`/api/report/${report?.id_laporan}` )
      .set('Authorization', token)
      .send({
        judul: '',
        bukti: '',
        lokasi: '',
        kategori: '',
        deskripsi: '',
        surat: '',
        usaha: '',
        tanggal: '',
      });

    logger.info(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should be rejected if report is not found', async () => {
    const report = await testService.getReport();
    if (!report) {
      throw new Error('Report tidak ditemukan untuk test ini');
    }
    const response = await request(app.getHttpServer())
      .put(`/api/report/${report.id_laporan + 1}` )
      .set('Authorization', token)
      .send({
        judul: 'valid',
        bukti: 'photo1.jpg',
        lokasi: 'Jl. Mawar',
        kategori: 'Infrastruktur',
        deskripsi: 'valid',
        surat: null,
        usaha: 'valid',
        tanggal: '2025-12-04',
      });

    logger.info(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should be able to update report', async () => {
    const report = await testService.getReport();
    const response = await request(app.getHttpServer())
      .put(`/api/report/${report?.id_laporan}`)
      .set('Authorization', token)
      .send({
        judul: 'Kerusakan Jalan update',
        bukti: 'photo1.jpg',
        lokasi: 'Jl. Mawar update',
        kategori: 'Infrastruktur update',
        deskripsi: 'Jalan berlubang parah update',
        surat: null,
        usaha: 'Perbaikan segera diperlukan update',
        tanggal: '2025-12-04',
      });

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id_laporan).toBe('RPT001');
    expect(response.body.data.judul).toBe('Kerusakan Jalan update');
    expect(response.body.data.id_user).toBeDefined();
  });
});

// delete report
describe('DELETE /api/report/:reportId', () => {
  beforeEach(async () => {
    await testService.deleteAll();
    await testService.createUser(); 
    await testService.createReport(); 
    token = 'test';  // sama seperti kontak
  });

  it('should be rejected if report is not found', async () => {
    const report = await testService.getReport();

    if (!report) {
      throw new Error('Report tidak ditemukan untuk test ini');
    }

    const response = await request(app.getHttpServer())
      .delete(`/api/report/${report.id_laporan + 1}`)
      .set('Authorization', token);

    logger.info(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should be able to remove report', async () => {
    const report = await testService.getReport();
    if (!report) {
      throw new Error('Report tidak ditemukan untuk test ini');
    }
    const response = await request(app.getHttpServer())
      .delete(`/api/report/${report.id_laporan}`)
      .set('Authorization', token);

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data).toBe(true);
  });
});

// get report
describe('GET /api/report/', () => {
  beforeEach(async () => {
    await testService.deleteAll();
    await testService.createUser(); 
    await testService.createReport(); 
    token = 'test';  // sama seperti kontak
  });


  it('should be able to search report', async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/report`)
      .set('Authorization', token);

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

  it('should be able to search report by name', async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/report`)
      .query({
        id_laporan: 'PT',
      })
      .set('Authorization', token);

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

});

});
