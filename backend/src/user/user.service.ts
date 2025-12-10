import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../model/user.model';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.debug(`Register new user ${JSON.stringify(request)}`);

    const registerRequest = this.validationService.validate(
      UserValidation.REGISTER,
      request,
    ) as RegisterUserRequest;

    // cek username sudah ada atau belum
    const exists = await this.prismaService.user.count({
      where: { username: registerRequest.username },
    });

    if (exists > 0) {
      throw new HttpException('Username already exists', 400);
    }

    // hash password
    const hash = await bcrypt.hash(registerRequest.password_hash, 10);

    const user = await this.prismaService.user.create({
      data: {
        username: registerRequest.username,
        name: registerRequest.name,
        email: registerRequest.email,
        notlp: registerRequest.notlp,
        tipe_user: registerRequest.tipe_user,
        password_hash: hash,
        token: null,
      },
    });

    return {
      id_user: user.id_user,
      username: user.username,
      name: user.name,
      email: user.email,
      notlp: user.notlp,
      tipe_user: user.tipe_user,
    };
  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    this.logger.debug(`UserService.login(${JSON.stringify(request)})`);

    const loginRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request, 
    );

    const user = await this.prismaService.user.findUnique({
      where: { username: loginRequest.username },
    });

    if (!user) {
      throw new HttpException('Username or password is invalid', 401);
    }

    const isValidPassword = await bcrypt.compare(
      loginRequest.password_hash,
      user.password_hash,
    );

    if (!isValidPassword) {
      throw new HttpException('Username or password is invalid', 401);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { username: user.username },
      data: { token: uuid() },
    });

    return {
      username: updatedUser.username,
      name: updatedUser.name,
      email: updatedUser.email,
      notlp: updatedUser.notlp,
      tipe_user: updatedUser.tipe_user,
      token: updatedUser.token,
    };
  }

  async get(user: User): Promise<UserResponse> {
    return {
      id_user: user.id_user,
      username: user.username,
      name: user.name,
      email: user.email,
      notlp: user.notlp,
      tipe_user: user.tipe_user,
      token: user.token,
    };
  }

  async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    this.logger.debug(`UserService.update(${JSON.stringify(user)}, ${JSON.stringify(request)})`);

    const updateRequest = this.validationService.validate(UserValidation.UPDATE, request);

    const updateData: any = {};

    if (updateRequest.name) updateData.name = updateRequest.name;
    if (updateRequest.email) updateData.email = updateRequest.email;
    if (updateRequest.notlp) updateData.notlp = updateRequest.notlp;
    if (updateRequest.password_hash) {
      updateData.password_hash = await bcrypt.hash(updateRequest.password_hash, 10);
    }

    const result = await this.prismaService.user.update({
      where: { id_user: user.id_user },
      data: updateData,
    });

    return {
      id_user: result.id_user,
      username: result.username,
      name: result.name,
      email: result.email,
      notlp: result.notlp,
      tipe_user: result.tipe_user,
      token: result.token,
    };
  }


  async logout(user: User): Promise<UserResponse> {
    const result = await this.prismaService.user.update({
      where: { id_user: user.id_user },
      data: { token: null },
    });

    return {
      id_user: result.id_user,
      username: result.username,
      name: result.name,
      email: result.email,
      notlp: result.notlp,
      tipe_user: result.tipe_user, 
    };
  }
}
