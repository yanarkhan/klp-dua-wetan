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
  Query,
} from "@nestjs/common";
import { Auth } from "../common/auth.decorator";
import type { User } from "@prisma/client";
import { WebResponse } from "../model/web.model";
import {
  CreateNewsRequest,
  NewsResponse,
  SearchNewsRequest,
} from "../model/news.model";
import { NewsService } from "./news.service";

@Controller("/api/news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  // ===================== CREATE ======================
  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreateNewsRequest
  ): Promise<WebResponse<NewsResponse>> {
    const result = await this.newsService.create(request, user);
    return {
      data: result,
    };
  }

  // ===================== GET ======================
  @Get("/:newsId")
  @HttpCode(200)
  async get(
    @Param("newsId", ParseIntPipe) newsId: number
  ): Promise<WebResponse<NewsResponse>> {
    const result = await this.newsService.get(newsId);
    return {
      data: result,
    };
  }

  // ===================== SEARCH / LIST ======================
  @Get("/")
  @HttpCode(200)
  async search(
    @Auth() user: User,
    @Query() request: SearchNewsRequest
  ): Promise<WebResponse<NewsResponse[]>> {
    const result = await this.newsService.search(request);
    return result;
  }

  // ===================== UPDATE ======================
  @Put("/:newsId")
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param("newsId", ParseIntPipe) newsId: number,
    @Body() request: CreateNewsRequest
  ): Promise<WebResponse<NewsResponse>> {
    const result = await this.newsService.update(request, user, { id_berita: newsId } as any);
    return {
      data: result,
    };
  }

  // ===================== DELETE ======================
  @Delete("/:newsId")
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param("newsId", ParseIntPipe) newsId: number
  ): Promise<WebResponse<NewsResponse>> {
    const result = await this.newsService.remove(user, newsId);
    return {
      data: result,
    };
  }
}
