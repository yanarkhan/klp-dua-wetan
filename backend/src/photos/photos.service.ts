import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { CreatePhotosRequest, PhotosResponse, SearchPhotosRequest, UpdatePhotosRequest } from "../model/photos.model";
import { Photos, Prisma, User } from "@prisma/client";
import { PhotosValidation } from "./photos.validation";
import { WebResponse } from "../model/web.model";

@Injectable()
export class PhotosService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ) {}

    toPhotosResponse(photos: Photos): PhotosResponse {
        return {
            id_foto: photos.id_foto,
            id_laporan: photos.id_laporan,
            id_status: photos.id_status,
            id_berita: photos.id_berita,
            nama: photos.nama,
            url: photos.url,
        };
    }

    async checkPhotosMustExists(photoId: number): Promise<Photos> {
        const photo = await this.prismaService.photos.findFirst({
            where: {
                id_foto: photoId,
            },
        });

        if (!photo) {
            throw new HttpException("Photos is not found", 404);
        }

        return photo;
    }

    async create(user: User, request: CreatePhotosRequest): Promise<PhotosResponse> {
        this.logger.debug(`Create new photos ${JSON.stringify(request)}`);

        const createRequest = this.validationService.validate(
            PhotosValidation.CREATE,
            request
        ) as CreatePhotosRequest;

        let dataToCreate: Prisma.PhotosCreateInput;

        // ================= ROLE ADMIN =================
        if (user.tipe_user === "admin") {
            if (createRequest.id_laporan) {
                throw new HttpException("Admin tidak boleh mengisi id_laporan", 400);
            }

            dataToCreate = {
                nama: createRequest.nama,
                url: createRequest.url,
                statusReport: createRequest.id_status
                    ? { connect: { id_status: createRequest.id_status } }
                    : undefined,
                news: createRequest.id_berita
                    ? { connect: { id_berita: createRequest.id_berita } }
                    : undefined,
            };
        }

        // ================= ROLE USER ==================
        else if (user.tipe_user === "user") {
            if (!createRequest.id_laporan) {
                throw new HttpException("User wajib mengisi id_laporan", 400);
            }

            if (createRequest.id_status || createRequest.id_berita) {
                throw new HttpException("User tidak boleh mengisi id_status / id_berita", 400);
            }

            dataToCreate = {
                nama: createRequest.nama,
                url: createRequest.url,
                report: {
                    connect: { id_laporan: createRequest.id_laporan },
                },
            };
        }

        // ================ ROLE TIDAK DIKENAL ===============
        else {
            throw new HttpException("Tipe user tidak valid", 403);
        }

        const photos = await this.prismaService.photos.create({ data: dataToCreate });

        return this.toPhotosResponse(photos);
    }

    async get(photoId: number): Promise<PhotosResponse> {
        const photo = await this.checkPhotosMustExists(photoId);
        return this.toPhotosResponse(photo);
    }

    async update(user: User, request: UpdatePhotosRequest): Promise<PhotosResponse> {
        const updateRequest = this.validationService.validate(
            PhotosValidation.UPDATE,
            request
        ) as UpdatePhotosRequest;

        let photo = await this.checkPhotosMustExists(updateRequest.id_foto);

        photo = await this.prismaService.photos.update({
            where: {
                id_foto: photo.id_foto,
            },
            data: updateRequest,
        });

        return this.toPhotosResponse(photo);
    }

    async remove(user: User, photosId: number): Promise<PhotosResponse> {
        const photo = await this.checkPhotosMustExists(photosId);

        if (user.tipe_user !== "admin") {
            throw new HttpException(
                "Anda tidak memiliki izin untuk menghapus foto ini",
                403
            );
        }

        const deletedPhoto = await this.prismaService.photos.delete({
            where: { id_foto: photosId },
        });

        return this.toPhotosResponse(deletedPhoto);
    }

    async search(
        user: User,
        request: SearchPhotosRequest
    ): Promise<WebResponse<PhotosResponse[]>> {
        const searchRequest = this.validationService.validate(
            PhotosValidation.SEARCH,
            request
        ) as SearchPhotosRequest;

        const filters: Prisma.PhotosWhereInput[] = [];

        if (searchRequest.id_berita) {
            filters.push({
                id_berita: Number(searchRequest.id_berita),
            });
        }

        if (searchRequest.id_status) {
            filters.push({
                id_status: Number(searchRequest.id_status),
            });
        }

        if (searchRequest.id_laporan) {
            filters.push({
                id_laporan: { contains: searchRequest.id_laporan },
            });
        }

        const skip = (searchRequest.page - 1) * searchRequest.size;

        const photo = await this.prismaService.photos.findMany({
            where: {
                AND: filters,
            },
            take: searchRequest.size,
            skip: skip,
        });

        const total = await this.prismaService.photos.count({
            where: { AND: filters },
        });

        return {
            data: photo.map((photo) => this.toPhotosResponse(photo)),
            paging: {
                current_page: searchRequest.page,
                size: searchRequest.size,
                total_page: Math.ceil(total / searchRequest.size),
            },
        };
    }
}
