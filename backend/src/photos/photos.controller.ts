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
  CreatePhotosRequest,
  PhotosResponse,
  SearchPhotosRequest,
  UpdatePhotosRequest,
} from "../model/photos.model";
import { PhotosService } from "./photos.service";

@Controller("/api/photos")
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  // ===================== CREATE ======================
  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreatePhotosRequest
  ): Promise<WebResponse<PhotosResponse>> {
    const result = await this.photosService.create(user, request);
    return {
      data: result,
    };
  }

  // ===================== GET ======================
  @Get("/:photoId")
  @HttpCode(200)
  async get(
    @Param("photoId", ParseIntPipe) photoId: number
  ): Promise<WebResponse<PhotosResponse>> {
    const result = await this.photosService.get(photoId);
    return {
      data: result,
    };
  }

  // ===================== SEARCH / LIST ======================
  @Get("/")
  @HttpCode(200)
  async search(
    @Auth() user: User,
    @Query() request: SearchPhotosRequest
  ): Promise<WebResponse<PhotosResponse[]>> {
    const result = await this.photosService.search(user, request);
    return result;
  }

  // ===================== UPDATE ======================
  @Put("/:photoId")
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param("photoId", ParseIntPipe) photoId: number,
    @Body() request: UpdatePhotosRequest
  ): Promise<WebResponse<PhotosResponse>> {
    const result = await this.photosService.update(user, {
      ...request,
      id_foto: photoId,
    });
    return {
      data: result,
    };
  }

  // ===================== DELETE ======================
  @Delete("/:photoId")
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param("photoId", ParseIntPipe) photoId: number
  ): Promise<WebResponse<PhotosResponse>> {
    const result = await this.photosService.remove(user, photoId);
    return {
      data: result,
    };
  }
}
