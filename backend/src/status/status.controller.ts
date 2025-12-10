import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { StatusService } from "./status.service";
import { Auth } from "../common/auth.decorator";
import type { User } from "@prisma/client";
import {
  CreateStatusRequest,
  StatusResponse,
  UpdateStatusRequest,
} from "../model/status.model";
import { WebResponse } from "../model/web.model";
import { ReportService } from "../report/report.service";

@Controller("/api/status")
export class StatusController {
  constructor(
    private statusService: StatusService,
    private reportService: ReportService
  ) {}

  @Post("/:reportId")
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Param("reportId") reportId: string,
    @Body() request: CreateStatusRequest
  ): Promise<WebResponse<StatusResponse>> {
    const report = await this.reportService.getMustExists(reportId);
    const result = await this.statusService.create(report, request, user);
    return {
      data: result,
    };
  }

  @Get("/:reportId/:statusId")
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param("reportId") reportId: string,
    @Param("statusId", ParseIntPipe) statusId: number
  ): Promise<WebResponse<StatusResponse>> {
    const report = await this.reportService.getMustExists(reportId);
    const result = await this.statusService.get(report, statusId);
    return {
      data: result,
    };
  }
  @Get("/:reportId")
@HttpCode(200)
async list(
  @Auth() user: User,
  @Param("reportId") reportId: string
): Promise<WebResponse<StatusResponse[]>> {

  const report = await this.reportService.getMustExists(reportId);

  const result = await this.statusService.list(report);
  return {
    data: result
  };
}

  @Put("/:reportId")
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param("reportId") reportId: string,
    @Body() request: UpdateStatusRequest
  ): Promise<WebResponse<StatusResponse>> {
    // id_status wajib ada di body
    if (!request.id_status) {
      throw new Error("id_status wajib untuk update");
    }

    const report = await this.reportService.getMustExists(reportId);
    const result = await this.statusService.update(report, request, user);
    return {
      data: result,
    };
  }

  @Delete("/:reportId/:statusId")
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param("reportId") reportId: string,
    @Param("statusId", ParseIntPipe) statusId: number
  ): Promise<WebResponse<boolean>> {
    const report = await this.reportService.getMustExists(reportId);
    await this.statusService.remove(report, statusId, user);
    return {
      data: true,
    };
  }
}
