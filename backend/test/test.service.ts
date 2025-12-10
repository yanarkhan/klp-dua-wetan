import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "../src/common/prisma.service";
import { User, Report } from "@prisma/client";

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteReport();
    await this.deleteUser();
  }

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        OR: [
          { username: 'test' },
          { username: 'test-admin' },
        ]
      }
    });
  }

  async deleteReport() {
    await this.prismaService.report.deleteMany({
      where: {
        id_laporan: 'RPT001',
      },
    });
  }

  async createUser(): Promise<User> {
    return this.prismaService.user.create({
      data: {
        username: 'test',
        name: 'testname',
        password_hash: await bcrypt.hash('test1234', 10),
        email: 'test@gmail.com',
        notlp: '088888888888888',
        tipe_user: 'user',
        token: 'test',
      },
    });
  }

  async createAdmin(): Promise<User> {
    return this.prismaService.user.create({
      data: {
        username: 'test-admin',
        name: 'testname',
        password_hash: await bcrypt.hash('test1234', 10),
        email: 'test@gmail.com',
        notlp: '088888888888888',
        tipe_user: 'admin',
        token: 'test-admin',
      },
    });
  }

  async getUser(): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { username: 'test' },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getReport(): Promise<Report | null> {
    return this.prismaService.report.findUnique({
      where: {
        id_laporan: 'RPT001',
      },
    });
  }

  async createReport(): Promise<Report> {
    const user = await this.getUser();

    return this.prismaService.report.create({
      data: {
        id_laporan: 'RPT001',
        id_user: user.id_user,
        judul: 'Kerusakan Jalan',
        bukti: 'photo.jpg',
        lokasi: 'Jl. Mawar',
        kategori: 'Infrastruktur',
        deskripsi: 'Rusak parah',
        surat: null,
        usaha: 'Perbaikan segera',
        tanggal: new Date('2025-12-04'),
      },
    });
  }
}
