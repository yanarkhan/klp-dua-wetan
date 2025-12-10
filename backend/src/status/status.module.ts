import { Module } from "@nestjs/common";
import { StatusService } from "./status.service";
import { StatusController } from "./status.controller";
import { ReportModule } from "../report/report.module";

@Module({
    providers: [StatusService],
    controllers: [StatusController],
    imports: [ReportModule]
})
export class StatusModule{

}