import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ReportService } from "./report.service";
import { Auth } from "../common/auth.decorator";
import type { User } from "@prisma/client";
import { CreateReportRequest, ReportResponse, SearchReportRequest, UpdateReportRequest } from "../model/report.model";
import { WebResponse } from "../model/web.model";

@Controller('/api/report')
export class ReportController {
    constructor(private reportService: ReportService){}

    @Post()
    @HttpCode(200)
    async create(
        @Auth() user:User,
        @Body() request: CreateReportRequest
    ): Promise<WebResponse<ReportResponse>> {
        const result = await this.reportService.create(user, request);
        return{
            data: result, 
        };
    }
    @Get('/:reportId')
    @HttpCode(200)
    async get(
        @Auth() user:User,
        @Param('reportId') reportId: string
    ): Promise<WebResponse<ReportResponse>> {
        const result = await this.reportService.get(user, reportId);
        return {
            data: result,
        };
    }

    @Put('/:reportId')
    @HttpCode(200)
    async update(
        @Auth() user:User,
        @Param('reportId') reportId: string,
        @Body() request: UpdateReportRequest
    ): Promise<WebResponse<ReportResponse>> {
        request.id_laporan = reportId;
        const result = await this.reportService.update(user, request);
        return{
            data: result, 
        };
    }

    @Delete('/:reportId')
    @HttpCode(200)
    async remove(
        @Auth() user:User,
        @Param('reportId') reportId: string
    ): Promise<WebResponse<boolean>> {
        const result = await this.reportService.remove(user, reportId);
        return {
            data: true,
        };
    }

    @Get()
    @HttpCode(200)
    async search(
        @Auth() user: User,
        @Query('id_laporan') id_laporan?: string,
        @Query('judul') judul?: string,
        @Query('lokasi') lokasi?: string,
        @Query('deskripsi') deskripsi?: string,
        @Query('tanggal') tanggal?: Date,
        @Query('page', new ParseIntPipe({ optional: true })) page?: number,
        @Query('size', new ParseIntPipe({ optional: true })) size?: number,

    ): Promise<WebResponse<ReportResponse[]>> {
        const request = {
            id_laporan: id_laporan,
            judul: judul,
            lokasi: lokasi,
            deskripsi: deskripsi,
            tanggal: tanggal,
            page: page || 1,
            size: size || 10,
        } as SearchReportRequest;
        return this.reportService.search(user, request);
    }
}