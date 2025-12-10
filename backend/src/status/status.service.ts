import { HttpException, Inject, Injectable, ForbiddenException } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { Report, StatusReport, User } from "@prisma/client";
import { CreateStatusRequest, StatusResponse, UpdateStatusRequest } from "../model/status.model";
import { StatusValidation } from "./status.validation";

@Injectable()
export class StatusService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService
  ) {}

  private assertAdmin(user: User) {
    if (user.tipe_user !== "admin") {
      throw new ForbiddenException("Only admin can perform this action");
    }
  }

  toStatusResponse(status: StatusReport): StatusResponse {
    return {
      id_status: status.id_status,
      id_laporan: status.id_laporan,
      status: status.status,
      keterangan: status.keterangan,
      tanggal: status.tanggal,
    };
  }

  async checkStatusMustExists(
    id_laporan: string,
    id_status: number
  ): Promise<StatusReport> {
    const status = await this.prismaService.statusReport.findFirst({
      where: {
        id_laporan,
        id_status,
      },
    });

    if (!status) {
      throw new HttpException("Status is not found", 404);
    }

    return status;
  }

  // ===================== CREATE (ADMIN ONLY) =====================
  async create(
    laporan: Report,
    request: CreateStatusRequest,
    user: User
  ): Promise<StatusResponse> {
    this.assertAdmin(user);

    this.logger.debug(`Create new Status ${JSON.stringify(request)}`);

    const createRequest = this.validationService.validate(
      StatusValidation.CREATE,
      request
    ) as CreateStatusRequest;

    const status = await this.prismaService.statusReport.create({
      data: {
        id_laporan: laporan.id_laporan,
        status: createRequest.status,
        keterangan: createRequest.keterangan,
        tanggal: createRequest.tanggal as Date,
      },
    });

    return this.toStatusResponse(status);
  }

  // ===================== GET (ADMIN & USER BOLEH) =====================
  async get(report: Report, id_status: number): Promise<StatusResponse> {
    const status = await this.checkStatusMustExists(report.id_laporan, id_status);
    return this.toStatusResponse(status);
  }

  // ===================== UPDATE (ADMIN ONLY) =====================
  async update(
    report: Report,
    request: UpdateStatusRequest,
    user: User
  ): Promise<StatusResponse> {
    this.assertAdmin(user);

    const updateRequest = this.validationService.validate(
      StatusValidation.UPDATE,
      request
    ) as UpdateStatusRequest;

    await this.checkStatusMustExists(report.id_laporan, updateRequest.id_status);

    const { id_status, ...data } = updateRequest;

    const status = await this.prismaService.statusReport.update({
      where: {
        id_status,
        id_laporan: report.id_laporan,
      },
      data: {
        status: data.status,
        keterangan: data.keterangan,
        tanggal: data.tanggal as Date,
      },
    });

    return this.toStatusResponse(status);
  }

  // ===================== DELETE (ADMIN ONLY) =====================
  async remove(
    report: Report,
    statusId: number,
    user: User
  ): Promise<void> {
    this.assertAdmin(user);

    await this.checkStatusMustExists(report.id_laporan, statusId);

    await this.prismaService.statusReport.delete({
      where: {
        id_status: statusId,
        id_laporan: report.id_laporan,
      },
    });
  }
  async list(report: Report): Promise<StatusResponse[]> {
  const statuses = await this.prismaService.statusReport.findMany({
    where: { id_laporan: report.id_laporan },
    orderBy: { id_status: 'asc' }
  });

  return statuses.map(s => this.toStatusResponse(s));
}
async getMustExists(
    id_laporan: string,
    id_status: number
): Promise<StatusReport> {
    const status = await this.checkStatusMustExists(id_laporan, id_status);
    return status;
}


}
