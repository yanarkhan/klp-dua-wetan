import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { StatusModule } from './status/status.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [CommonModule, UserModule, ReportModule, StatusModule, NewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
