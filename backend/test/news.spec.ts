import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { TestService } from "./test.service";
import { TestModule } from "./test.module";

describe("NewsController", () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;
  let tokenAdmin: string;
  let tokenUser: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  // ================= POST /api/news =================
  describe("POST /api/news", () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      await testService.createAdmin();
      tokenUser = "test";
      tokenAdmin = "test-admin";
    });

    it("should be rejected if request is invalid", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/news")
        .set("Authorization", tokenAdmin)
        .send({
          judul_berita: "",
          deskripsi: "",
          ringkas: "",
          tanggal: "",
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it("should be rejected if user is not admin", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/news")
        .set("Authorization", tokenUser)
        .send({
          judul_berita: "Berita Banjir",
          deskripsi: "Telah terjadi banjir besar",
          ringkas: "Banjir besar",
          tanggal: "2025-12-04",
        });

      logger.info(response.body);

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
    });

    it("should be able to create news", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/news")
        .set("Authorization", tokenAdmin)
        .send({
          judul_berita: "Berita Banjir",
          deskripsi: "Telah terjadi banjir besar",
          ringkas: "Banjir besar",
          tanggal: "2025-12-04",
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.judul_berita).toBe("Berita Banjir");
    });
  });

  // ================= GET /api/news/:newsId =================
  describe("GET /api/news/:newsId", () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createAdmin();
      tokenAdmin = "test-admin";

      await request(app.getHttpServer())
        .post("/api/news")
        .set("Authorization", tokenAdmin)
        .send({
          judul_berita: "Berita A",
          deskripsi: "Detail A",
          ringkas: "Ringkas A",
          tanggal: "2025-12-04",
        });
    });

    it("should return 404 if news not found", async () => {
      const response = await request(app.getHttpServer())
        .get("/api/news/99999")
        .set("Authorization", tokenAdmin);

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it("should be able to get news by id", async () => {
      const response = await request(app.getHttpServer())
        .get("/api/news/1")
        .set("Authorization", tokenAdmin);

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id_berita).toBeDefined();
      expect(response.body.data.judul_berita).toBe("Berita A");
    });
  });

  // ================= PUT /api/news/:newsId =================
  describe("PUT /api/news/:newsId", () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createAdmin();
      tokenAdmin = "test-admin";

      await request(app.getHttpServer())
        .post("/api/news")
        .set("Authorization", tokenAdmin)
        .send({
          judul_berita: "Berita Lama",
          deskripsi: "Detail lama",
          ringkas: "Ringkas lama",
          tanggal: "2025-12-04",
        });
    });

    it("should reject invalid request", async () => {
      const response = await request(app.getHttpServer())
        .put("/api/news/1")
        .set("Authorization", tokenAdmin)
        .send({
          judul_berita: "",
          deskripsi: "",
          ringkas: "",
          tanggal: "",
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it("should update news", async () => {
      const response = await request(app.getHttpServer())
        .put("/api/news/1")
        .set("Authorization", tokenAdmin)
        .send({
          judul_berita: "Berita Baru",
          deskripsi: "Update detail",
          ringkas: "Update ringkas",
          tanggal: "2025-12-04",
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.judul_berita).toBe("Berita Baru");
    });
  });

  // ================= DELETE /api/news/:newsId =================
  describe("DELETE /api/news/:newsId", () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createAdmin();
      tokenAdmin = "test-admin";

      await request(app.getHttpServer())
        .post("/api/news")
        .set("Authorization", tokenAdmin)
        .send({
          judul_berita: "Berita Delete",
          deskripsi: "Detail delete",
          ringkas: "Ringkas delete",
          tanggal: "2025-12-04",
        });
    });

    it("should be able to delete news", async () => {
      const response = await request(app.getHttpServer())
        .delete("/api/news/1")
        .set("Authorization", tokenAdmin);

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id_berita).toBe(1);
    });
  });

  // ================= SEARCH /api/news =================
  describe("GET /api/news", () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createAdmin();
      tokenAdmin = "test-admin";

      await request(app.getHttpServer())
        .post("/api/news")
        .set("Authorization", tokenAdmin)
        .send({
          judul_berita: "Test Search",
          deskripsi: "Search",
          ringkas: "Test",
          tanggal: "2025-12-04",
        });
    });

    it("should be able to search news", async () => {
      const response = await request(app.getHttpServer())
        .get("/api/news?page=1&size=10")
        .set("Authorization", tokenAdmin);

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });
  });
});
