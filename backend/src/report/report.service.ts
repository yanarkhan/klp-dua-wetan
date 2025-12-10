import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { PrismaService } from "../common/prisma.service";
import { User, Report, Prisma } from "@prisma/client";
import { CreateReportRequest, ReportResponse, SearchReportRequest, UpdateReportRequest } from "../model/report.model";
import { ValidationService } from "../common/validation.service";
import { ReportValidation } from "./report.validation";
import { WebResponse } from "../model/web.model";

@Injectable()
export class ReportService {
    constructor (
        @Inject(WINSTON_MODULE_PROVIDER) 
        private logger: Logger,
        private prismaService: PrismaService, 
        private validationService: ValidationService
    ){}

    async create(
        user: User, 
        request: CreateReportRequest
    ): Promise<ReportResponse>{
        this.logger.debug(`Create new report ${JSON.stringify(request)}`);
        const createRequest = this.validationService.validate(
            ReportValidation.CREATE, 
            request
        ) as CreateReportRequest; 

        const report = await this.prismaService.report.create({
            data: {
                ...createRequest,
                ...{
                    id_user : user.id_user
                }
            },
        });
        return this.toReportResponse(report);

    }

    toReportResponse (report: Report): ReportResponse {
        return {
            id_laporan: report.id_laporan,
            id_user: report.id_user,
            judul: report.judul,
            bukti: report.bukti,
            lokasi: report.lokasi,
            kategori : report.kategori,
            deskripsi: report.deskripsi,
            surat: report.surat,
            usaha: report.usaha,
            tanggal: report.tanggal,
        }
    }

    async checkReportMustExists(
        id_user: number, 
        reportId: string
    ) : Promise<Report> {
        const report = await this.prismaService.report.findFirst({
            where:{
                id_user: id_user,
                id_laporan: reportId
            },
        });
        if (!report){
            throw new HttpException('Report is not Found', 404);
        }
        return report;
    }
    async getMustExists(id_laporan: string): Promise<Report> {
    const report = await this.prismaService.report.findUnique({
        where: { id_laporan }
    });

    if (!report) {
        throw new HttpException("Report is not found", 404);
    }

    return report;
    }

    
    // get report sesuai user (untuk user)
    async get(
        user: User,
        reportId: string 
    ): Promise<ReportResponse>{
        const report = await this.checkReportMustExists(user.id_user, reportId); 

        return this.toReportResponse(report);
    }

    async update(
        user: User,
        request: UpdateReportRequest,
    ): Promise<ReportResponse> {

        const updateRequest = this.validationService.validate(
            ReportValidation.UPDATE, 
            request
        ) as UpdateReportRequest;

        let report = await this.checkReportMustExists(user.id_user, updateRequest.id_laporan);

        report = await this.prismaService.report.update({
            where: {
                id_laporan: report.id_laporan,
                id_user: report.id_user,
            },
            data: updateRequest
        });

        return this.toReportResponse(report);
    }

    async remove(
        user: User,
        reportId: string
    ): Promise<ReportResponse>{
        await this.checkReportMustExists(user.id_user, reportId);
        const report = await this.prismaService.report.delete({
        where: {
            id_laporan: reportId,
            id_user: user.id_user,
            },
        });
        return this.toReportResponse(report);
    }

    async search(
        user: User,
        request: SearchReportRequest,
    ): Promise<WebResponse<ReportResponse[]>> {
        const searchRequest = this.validationService.validate(
            ReportValidation.SEARCH, 
            request
        ) as SearchReportRequest;
         
        const filters: Prisma.ReportWhereInput[] = [];
         
        if (searchRequest.id_laporan) {
            filters.push({
                OR: [
                {
                    id_laporan: { contains: searchRequest.id_laporan },
                },
                ],
            });
        }
        if(searchRequest.deskripsi){
            filters.push({
                OR: [
                {
                    deskripsi: { contains: searchRequest.deskripsi },
                },
                ],
            });
        }
        if(searchRequest.judul){
            filters.push({
                OR: [
                {
                    judul: { contains: searchRequest.judul },
                },
                ],
            });
        }
        if(searchRequest.lokasi){
        filters.push({
                OR: [
                {
                    lokasi: { contains: searchRequest.lokasi },
                },
                ],
            });
        }
        if(searchRequest.tanggal){
            filters.push({
                tanggal: {
                    equals: new Date(searchRequest.tanggal),
                },
            });
        }
        const skip = (searchRequest.page - 1) * searchRequest.size;

        const report = await this.prismaService.report.findMany({
            where:{
                id_user: user.id_user,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await this.prismaService.report.count({
            where:{
                id_user: user.id_user,
                AND: filters
            },
        });

        return {
            data: report.map(report => this.toReportResponse(report)),
            paging: {
                current_page: searchRequest.page,
                size: searchRequest.size,
                total_page: Math.ceil(total / searchRequest.size),

            },
        };
    }
}