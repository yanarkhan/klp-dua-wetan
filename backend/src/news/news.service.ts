import { ForbiddenException, HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { CreateNewsRequest, NewsResponse, SearchNewsRequest } from "../model/news.model";
import { News, Prisma, User } from "@prisma/client";
import { NewsValidation } from "./news.validation";
import { WebResponse } from "../model/web.model";

@Injectable()
export class NewsService {

    constructor (
        @Inject(WINSTON_MODULE_PROVIDER)
        private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService

    ){}
      private assertAdmin(user: User) {
        if (user.tipe_user !== "admin") {
          throw new ForbiddenException("Only admin can perform this action");
        }
      }

      toReportResponse (news: News): NewsResponse {
        return { 
                id_berita : news.id_berita,
                judul_berita: news.judul_berita,
                deskripsi:    news.deskripsi,
                ringkas:      news.ringkas,
                tanggal:      news.tanggal
        }
      }

    async checkNewsMustExists(
        newsIds: number, 
    ) : Promise<News> {
        const news = await this.prismaService.news.findFirst({
            where:{
                id_berita: newsIds
            },
        });
        if (!news){
            throw new HttpException('News is not Found', 404);
        }
        return news;
    }

      async create(
        request: CreateNewsRequest,
        user: User
      ): Promise<NewsResponse> {
        this.assertAdmin(user);
    
        this.logger.debug(`Create new News ${JSON.stringify(request)}`);
    
        const createRequest = this.validationService.validate(
          NewsValidation.CREATE,
          request
        ) as CreateNewsRequest;
    
        const news = await this.prismaService.news.create({
          data: {
            ...createRequest
          },
        });
    
        return this.toReportResponse(news);
      }

      async get (
        newsId: number,
      ): Promise<NewsResponse> {
        const news = await this.checkNewsMustExists(newsId);
        return this.toReportResponse(news);

      }

    async update(
        request: CreateNewsRequest,
        user: User,
        newsId: News
      ): Promise<NewsResponse> {
        this.assertAdmin(user);
        const updateRequest = this.validationService.validate(
          NewsValidation.CREATE,
          request
        ) as CreateNewsRequest;
    
        let news = await this.checkNewsMustExists(newsId.id_berita);

        news = await this.prismaService.news.update({
            where: {
                id_berita: news.id_berita,
            },
            data: updateRequest
        })
    
        return this.toReportResponse(news);
      }

    async remove(
        user: User,
        newsId: number,
    ): Promise<NewsResponse> {
        this.assertAdmin(user);
        await this.checkNewsMustExists(newsId);
        const news = await this.prismaService.news.delete({
            where:{
                id_berita: newsId, 
            }
        })
        return this.toReportResponse(news);
    }

async search(
  request: SearchNewsRequest
): Promise<WebResponse<NewsResponse[]>> {
  const searchRequest = this.validationService.validate(
    NewsValidation.SEARCH,
    request
  ) as SearchNewsRequest;

  const filters: Prisma.NewsWhereInput[] = [];

  if (searchRequest.judul_berita) {
    filters.push({
      judul_berita: { contains: searchRequest.judul_berita},
    });
  }

  if (searchRequest.deskripsi) {
    filters.push({
      deskripsi: { contains: searchRequest.deskripsi},
    });
  }

  if (searchRequest.ringkas) {
    filters.push({
      ringkas: { contains: searchRequest.ringkas},
    });
  }

  if (searchRequest.tanggal) {
    filters.push({
      tanggal: { equals: new Date(searchRequest.tanggal) },
    });
  }

  const skip = (searchRequest.page - 1) * searchRequest.size;

  const news = await this.prismaService.news.findMany({
    where: {
      AND: filters,
    },
    orderBy: { id_berita: "desc" },
    take: searchRequest.size,
    skip,
  });

  const total = await this.prismaService.news.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: news.map(n => this.toReportResponse(n)),
    paging: {
      current_page: searchRequest.page,
      size: searchRequest.size,
      total_page: Math.ceil(total / searchRequest.size),
    },
  };
}


}