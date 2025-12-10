import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {

    const adapter = new PrismaMariaDb({
      host: 'localhost',        
      user: 'root',            
      password: '',            
      database: 'api_lamas' 
    });

    super({
      adapter, 
      log: [
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'query' },
      ],
    });
  }

  onModuleInit() {
    this.$on('info', (event) => this.logger.info(event));
    this.$on('warn', (event) => this.logger.warn(event));
    this.$on('error', (event) => this.logger.error(event));
    this.$on('query', (event) => this.logger.info(event));
  }
}
